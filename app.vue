<script setup>
	// const { productsData } = await useFetch('/api/products')
	import productsData from '~/assets/products.json'
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
				windowWidth: null,
				isAppAtTop: null,
			}
		},
		setup() {
			provide('isAppAtTop', this.isAppAtTop)
			provide('windowWidth', this.windowWidth)
		},
		mounted() {
			this.windowWidth = window.innerWidth
			this.isAppAtTop = window.pageYOffset === 0

			// эти обработчики событий не обрабатывают события нихуя ._.
			window.addEventListener('scroll', () => {
				this.isAppAtTop = window.pageYOffset === 0
			})
			window.addEventListener('resize', () => {
				this.windowWidth = window.innerWidth
			})

			if ('onmousemove' in window) {
				this.useCustomCursor(this.$refs.cursor)
			}
		},
		methods: {
			useCustomCursor(cursor) {
				const setCursorPos = (e) => {
					const offsetX = cursor.offsetWidth / 2
					const offsetY = cursor.offsetHeight / 2
					const x = e.clientX - offsetX
					const y = e.clientY + window.scrollY - offsetY
					cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`
				}

				window.addEventListener('mousemove', setCursorPos)
			},
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
