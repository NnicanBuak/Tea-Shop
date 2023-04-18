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
</script>

<template>
	<div class="h-screen">
		<form class="container flex items-center space-x-6">
			<div class="shrink-0">
				<img
					class="h-16 w-16 object-cover rounded-full"
					v-if="userData?.avatar_url"
					:src="userData?.avatar_url"
					alt="Current profile photo"
				/>
			</div>
			<label class="block">
				<input
					type="file"
					accept="image/*"
					class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:border-solid file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
					@change.prevent="handleUpdateAvatar($event.target.files[0])"
				/>
			</label>
		</form>
	</div>
</template>

<script>
	export default {
		name: 'profile',
		data() {
			return { userData: null }
		},
		async asyncData() {
			if (user.value) {
				let { data: userData, error } = await this.supabase
					.from('profiles')
					.select('avatar_url')
					.eq('id', user.value.id)
				if (error) console.error(error)
				else return { userData }
			}
			return {}
		},
		methods: {
			async handleUpdateAvatar(avatarFile) {
				const supabase = useSupabaseClient()
				const user = useSupabaseUser()

				const { data: files_list, error: listError } = await supabase.storage
					.from('user')
					.list('avatars/')
				if (listError) console.error(listError)

				console.log(files_list)
				const existingFile = files_list?.find((file) =>
					file.name.startsWith(`avtar_${user.value.id}`),
				)

				if (existingFile) {
					const { error: deleteError } = await supabase.storage
						.from('user/avatars')
						.download(`avatar_${user.value.id}`)
					if (deleteError) console.error(deleteError)
				}

				const { data: uploadedFile, error: uploadError } =
					await supabase.storage
						.from('user/avatars')
						.upload(`avatar_${user.value.id}`, avatarFile)
				if (uploadError) console.error(uploadError)

				console.log(uploadedFile)
				const avatar_url = ''

				const { data, error } = await supabase
					.from('profiles')
					.update({ avatar_url: avatar_url })
					.eq('id', user.value?.id)
				if (error) console.error(error)
				else this.userData = data
			},
		},
	}
</script>
