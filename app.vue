<script setup>
	// const { productsData } = await useFetch('/api/products')
	import productsData from '~/assets/products.json'
</script>

<template>
	<NuxtLayout>
		<NuxtLoadingIndicator />
		<NuxtPage :products="productsData"></NuxtPage>
	</NuxtLayout>
</template>

<script>
	export default {
		name: 'app',
		data() {
			const isAppDesktop = useMediaQuery('(min-width: 1024px)')
			const isAppMobile = useMediaQuery('not all and (min-width: 1024px)')
			const appScroll = useWindowScroll()

			return { isAppDesktop, isAppMobile, appScroll }
		},
		computed: {
			isAppAtTop() {
				return this.appScroll.y.value === 0
			},
		},
		provide() {
			return {
				isAppDesktop: this.isAppDesktop,
				isAppMobile: this.isAppMobile,
				isAppAtTop: this.isAppAtTop,
			}
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
		#__nuxt,
		button,
		a {
			cursor: none;
		}
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
