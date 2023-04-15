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
			else navigateTo('/profile')
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
		} catch (error) {
			alert(error.error_description || error.message)
		} finally {
			loading.value = false
		}
	}
</script>

<template>
	<TabsWrapper
		class="h-screen w-full flex flex-col gap-10 justify-center items-center"
	>
		<Tab title="log-in">
			<form @submit.prevent="handleLogin">
				<div class="text-center">
					<div>
						<input
							class="inputField"
							type="email"
							placeholder="email"
							v-model="email"
						/>
						<input
							class="inputField"
							type="password"
							placeholder="пароль"
							v-model="password"
						/>
					</div>
					<div>
						<input
							class="button"
							type="submit"
							:value="loading ? 'Загрузка' : 'Войти'"
							:disabled="loading"
						/>
					</div>
				</div>
			</form>
		</Tab>
		<Tab title="sign-up">
			<form @submit.prevent="handleSignup">
				<div class="text-center">
					<div>
						<input
							class="inputField"
							type="email"
							placeholder="email"
							v-model="email"
						/>
						<input
							class="inputField"
							type="password"
							placeholder="пароль"
							v-model="password"
						/>
					</div>
					<div>
						<input
							class="button"
							type="submit"
							:value="loading ? 'Загрузка' : 'Зарегистрироваться'"
							:disabled="loading"
						/>
					</div>
				</div>
			</form>
		</Tab>
	</TabsWrapper>
</template>
