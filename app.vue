<script setup>
	// const { productsData } = await useFetch('/api/products')
	import productsData from '~/assets/products.json'
</script>

<template>
	<NuxtLayout :name="layout">
		<NuxtPage :products="productsData"></NuxtPage>
	</NuxtLayout>
</template>

<script>
	export default {
		name: 'app',
		data() {
			const layout = this.$device.isMobile ? 'mobile' : 'default'
			return { layout }
		},
		mounted() {
			let vh = window.innerHeight * 0.01
			document.documentElement.style.setProperty('--vh', `${vh}px`)
		},
	}
</script>

<style>
	@media (pointer: fine) {
		/* Стили для устройств с мышью */
		#cursor {
			background-color: #bfd400;
		}
		/* #__nuxt,
		button,
		a {
			cursor: none;
		} */
	}
	img {
		width: 100%;
	}
	h1 {
		font-family: 'Montserrat', sans-serif;
	}
	p {
		font-family: Arial, Helvetica, sans-serif;
	}
	button:focus-visible,
	a:focus-visible {
		outline: none;
	}

	.page-enter-active,
	.page-leave-active {
		transition: all 0.4s;
	}
	.page-enter-from,
	.page-leave-to {
		opacity: 0;
		filter: blur(1rem);
	}
</style>
