<script setup>
	const props = defineProps({ error: Object })

	const error = useError()
	if (error.value.statusCode === 404 || '404') {
		error.value.message = '[script]: Страница не найдена 😔'
	}

	const handleError = () => clearError({ redirect: '/shop' })
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
			<h1 class="text-4xl font-bold">{{ error.statusCode }}</h1>
			<span>{{ error.url }}</span>
			<p class="font-sans text-2xl" v-if="error.statusCode === 404 || '404'">
				Упс! Кажется страница не найдена 🥺
			</p>
			<button
				class="p-2 px-4 text-2xl text-black bg-primary rounded-full"
				@click="handleError"
			>
				Домой
			</button>
		</div>
	</div>
</template>
