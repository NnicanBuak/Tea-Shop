<script setup>
	definePageMeta({
		hasHeader: false,
		middleware: [
			async function (to, from) {
				const user = useSupabaseUser()

				if (user.value) {
					return navigateTo(from ? from : '/shop')
				}
			},
		],
	})

	const client = useSupabaseAuthClient()

	const loading = ref(false)
	const email = ref('')
	const password = ref('')

	const handleLogin = async () => {
		try {
			loading.value = true
			let { data, error } = await client.auth.signInWithPassword({
				email: email.value,
				password: password.value,
			})
			console.log(data)
			if (error) throw error
			else navigateTo('/shop')
		} catch (error) {
			alert(error.error_description || error.message)
		} finally {
			loading.value = false
		}
	}

	const handleSignup = async () => {
		try {
			loading.value = true
			let { data, error } = await client.auth.signUp({
				email: email.value,
				password: password.value,
			})
			console.log(data)
			if (error) throw error
			else navigateTo('/profile')
		} catch (error) {
			alert(error.error_description || error.message)
		} finally {
			loading.value = false
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
								placeholder="пароль"
								v-model="password"
							/>
						</div>
						<div>
							<input
								class="button w-full px-4 p-2 text-white bg-primary2 rounded-full"
								type="submit"
								:value="loading ? 'Загрузка' : 'Войти'"
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
								placeholder="пароль"
								v-model="password"
							/>
						</div>
						<div>
							<input
								class="button w-full px-4 p-2 text-white bg-primary2 rounded-full"
								type="submit"
								:value="loading ? 'Загрузка' : 'Зарегистрироваться'"
								:disabled="loading"
							/>
						</div>
					</div>
				</form>
			</Tab>
		</TabsWrapper>
	</div>
</template>
