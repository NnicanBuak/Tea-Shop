<script setup>
	const { productsData } = await useFetch('/api/products')
</script>

<template>
	<NuxtLayout>
		<NuxtPage :products="productsData"></NuxtPage>
	</NuxtLayout>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {
				productsData: null,
				windowWidth: null,
			}
		},
		asyncData() {
			return productsData
		},
		created() {
			provide('windowWidth', this.windowWidth)
		},
		mounted() {
			window.addEventListener('resize', () => {
				this.windowWidth = window.innerWidth
			})
		},
	}
</script>

<style>
	@media (pointer: fine) {
		/* Стили для устройств с мышью */
		#cursor {
			background-color: #bfd400;
		}
		#hero,
		a {
			cursor: none;
		}
		#hero button {
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
