<script setup>
	defineProps({
		error: Object,
	})

	const handleError = () => clearError({ redirect: '/' })
</script>

<template>
	<div
		class="container h-screen grid place-content-center"
		:style="{
			backgroundImage: 'url(./img/8_1.png)',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center right 20%',
			backgroundSize: 'cover',
		}"
	>
		<div
			class="mt-7 p-4 space-y-8 max-w-sm mx-auto text-center text-white bg-primary2 bg-opacity-75 shadow-xl rounded-3xl"
		>
			<h1 class="text-7xl font-bold">{{ error.statusCode }}</h1>
			<span class="text-2xl" v-if="error.statusCode === 404">{{
				error.url
			}}</span>
			<p class="font-sans text-2xl">{{ error.statusMessage }}</p>
			<button
				class="p-2 px-4 text-2xl text-black bg-primary rounded-full"
				@click="handleError"
			>
				Домой
			</button>
		</div>
	</div>
</template>

<script>
	export default {
		created() {
			console.error(this.error.message)
			switch (this.error.statusCode) {
				case 404:
				case '404':
					this.error.statusMessage = 'Упс! Кажется страница не найдена 😔'
					break
				case 500:
				case '500':
					this.error.statusMessage =
						'Невозможно подключиться к серверу, попробуйте обновить страницу 🆙'
					break
				default:
					break
			}
		},
	}
</script>
