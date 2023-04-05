<script setup>
	// const { productsData } = await useFetch('/api/products')
	import productsData from '~/assets/products.json'
</script>

<template>
	<NuxtLoadingIndicator class="w-screen" color="#bfd400" />
	<NuxtLayout :name="layout" :hasHeader="hasHeader" :hasFooter="hasFooter">
		<main class="space-y-40 overflow-auto">
			<NuxtPage :products="productsData"></NuxtPage>
			<section
				class="relative py-12 px-[calc(8vw+24px)] space-y-8 text-gray-700 bg-primary bg-opacity-10 overflow-clip"
				v-if="hasNewsletterBlock"
			>
				<nuxt-picture
					class="absolute inset-0 left-4 w-[5vw]"
					src="/img/decoration.svg"
				></nuxt-picture>
				<h1 class="font-bold font-serif text-4xl">
					Подпишись на&nbsp;рассылку
				</h1>
				<form class="space-y-4" action="newsletterSubscribing">
					<input
						class="px-4 p-2 shadow-inner rounded-full"
						type="email"
						placeholder="Ваш email"
						required
					/>
					<button
						class="px-4 p-2 text-white bg-primary2 rounded-full"
						type="submit"
					>
						Подписаться
					</button>
				</form>
			</section>
		</main>
	</NuxtLayout>
</template>

<script>
	export default {
		name: 'app',
		data() {
			const { hasNewsletterBlock, hasFooter, hasHeader } = this.$route.meta
			return {
				hasNewsletterBlock,
				hasFooter,
				hasHeader,
			}
		},
		computed: {
			layout() {
				return this.$device.isMobile ? 'mobile' : 'default'
			},
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

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.2s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}

	.long-fade-enter-active,
	.long-fade-leave-active {
		transition: opacity 1s ease-in;
	}

	.long-fade-enter-from,
	.long-fade-leave-to {
		opacity: 0;
	}
</style>
