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
			content: false,
		},
		hasFooterOffset: {
			hid: 'hasFooterOffset',
			name: 'hasFooterOffset',
			content: false,
		},
	})

	const supabaseAuth = useSupabaseAuthClient()

	let loading = ref(false)
	let email = ref('')
	let password = ref('')

	const handleLogin = async () => {
		try {
			loading = true
			let { data, error } = await supabaseAuth.auth.signInWithPassword({
				email: email.value,
				password: password.value,
			})
			console.log(data)
			if (error) throw error
			else navigateTo('/shop')
		} catch (error) {
			alert(error.error_description || error.message)
		} finally {
			loading = false
		}
	}

	const handleSignup = async () => {
		try {
			loading = true
			let { data, error } = await supabaseAuth.auth.signUp({
				email: email.value,
				password: password.value,
			})
			console.log(data)
			if (error) throw error
			else navigateTo('/profile')
		} catch (error) {
			alert(error.error_description || error.message)
		} finally {
			loading = false
		}
	}
</script>

<template>
	<div class="container h-screen w-full grid place-content-center">
		<TabsWrapper class="card flex flex-col gap-10 justify-center items-center">
			<Tab title="Вход">
				<form @submit.prevent="handleLogin">
					<div class="space-y-8 text-center">
						<div class="space-y-6">
							<input
								class="px-4 p-2 shadow-inner rounded-full"
								type="email"
								placeholder="email"
								v-model="email"
							/>
							<input
								class="px-4 p-2 shadow-inner rounded-full"
								type="password"
								placeholder="password"
								v-model="password"
							/>
						</div>
						<div>
							<input
								class="button w-full px-4 p-2 font-normal text-white text-lg bg-primary2 rounded-full"
								type="submit"
								:value="loading ? '🔃' : 'Войти'"
								:disabled="loading"
							/>
						</div>
					</div>
				</form>
			</Tab>
			<Tab title="Регистрация">
				<form @submit.prevent="handleSignup">
					<div class="space-y-8 text-center">
						<div class="space-y-6">
							<input
								class="px-4 p-2 shadow-inner rounded-full"
								type="email"
								placeholder="email"
								v-model="email"
							/>
							<input
								class="px-4 p-2 shadow-inner rounded-full"
								type="password"
								placeholder="password"
								v-model="password"
							/>
						</div>
						<div>
							<input
								class="button w-full px-4 p-2 font-normal text-white text-lg bg-primary2 rounded-full"
								type="submit"
								:value="loading ? '🔃' : 'Зарегистрироваться'"
								:disabled="loading"
							/>
						</div>
					</div>
				</form>
			</Tab>
		</TabsWrapper>
	</div>
</template>
