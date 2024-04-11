<script setup>
	definePageMeta({
		hasDesktopHeader: {
			hid: 'hasDesktopHeader',
			name: 'hasDesktopHeader',
			content: true,
		},
		hasHeaderOffset: {
			hid: 'hasHeaderOffset',
			name: 'hasHeaderOffset',
			content: true,
		},
		hasFooterOffset: {
			hid: 'hasFooterOffset',
			name: 'hasFooterOffset',
			content: false,
		},
		middleware: ['auth'],
	})

	const supabase = useSupabaseClient()

	let { data: userData } = useAsyncData('userData', async () => {
		const user = useSupabaseUser()

		if (user.value) {
			let { data, error } = await supabase
				.from('profiles')
				.select('avatar_url')
				.eq('id', user.value.id)
			if (error) console.error(error)
			else return { data }
		}
		return {}
	})

	const handleLogout = async () => {
		await supabase.auth
			.signOut()
			.then(() => console.log('User signed out successfully'))
			.catch((error) => console.log('Error signing out:', error.message))
		navigateTo('/shop')
	}
</script>

<template>
	<main class="container xl:container-xl h-screen">
		<button type="button" @click="handleLogout">
			<Icon
				class="text-primary2"
				name="material-symbols:logout-rounded"
				size="48px"
			/>
		</button>
		<form class="flex items-center space-x-6">
			<div class="wrapper p-1 shrink-0 ring-4 ring-primary2 rounded-full">
				<nuxt-img
					class="h-16 w-16 object-cover rounded-full"
					v-if="userData?.data[0].avatar_url"
					:src="userData?.data[0].avatar_url"
					alt="Текущее фото профиля"
				/>
			</div>
			<label class="block">
				<input
					type="file"
					accept="image/*"
					class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:border-solid file:text-sm file:font-semibold file:bg-primary2 file:text-white hover:file:bg-violet-100"
					@change.prevent="handleUpdateAvatar($event.target.files[0])"
				/>
			</label>
		</form>
	</main>
</template>

<script>
	export default {
		methods: {
			async handleUpdateAvatar(avatarFile) {
				const user = useSupabaseUser()

				if (user.value) {
					const supabase = useSupabaseClient()

					let { data: uploadedFile, error: uploadError } =
						await supabase.storage
							.from('user/avatars')
							.upload(`avatar_${user.value.id}`, avatarFile)
					if (uploadError) console.error('[Supabase] ' + uploadError)

					if (uploadError?.statusCode == 409) {
						let { error: deleteError } = await supabase.storage
							.from('user/avatars')
							.delete(`avatar_${user.value.id}`, avatarFile)
						if (deleteError) console.error('[Supabase] ' + deleteError)

						let { data: uploadedFile, error: uploadError } =
							await supabase.storage
								.from('user/avatars')
								.upload(`avatar_${user.value.id}`, avatarFile)
						if (uploadError) console.error('[Supabase] ' + uploadError)
					} else {
						let { data: avatar_url } = supabase.storage
							.from('user/avatars')
							.getPublicUrl(`avatar_${user.value.id}`)

						let { data, error } = await supabase
							.from('profiles')
							.update({ avatar_url: avatar_url.publicUrl })
							.eq('id', user.value.id)
						if (error) console.error('[Supabase] ' + error)
					}
				}
			},
		},
	}
</script>
