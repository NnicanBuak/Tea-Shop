<script setup>
	// const { productsData } = await useFetch('/api/products')
	import productsData from '~/assets/products.json'
</script>

<template>
	<NuxtLoadingIndicator class="w-screen" color="#bfd400" />
	<NuxtLayout :name="layout" :hasHeader="hasHeader">
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
				<h1>Подпишись на&nbsp;рассылку</h1>
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
			const { hasNewsletterBlock, hasHeader } = this.$route.meta
			return {
				hasNewsletterBlock,
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
	button:focus-visible,
	a:focus-visible {
		outline: none;
	}
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-family: 'EB+Garamond', serif;
		font-weight: bold;
	}
	p {
		font-family: 'Montserrat, sans-serif';
		font-size: 1rem;
		line-height: 1.5rem;
	}
	h1 {
		font-size: 2.25rem;
		line-height: 2.5rem;
	}
	h2 {
		font-size: 1.875rem;
		line-height: 2.25rem;
	}
	h3 {
		font-size: 1.5rem;
		line-height: 2rem;
	}
	h4 {
		font-size: 1.25rem;
		line-height: 1.75rem;
	}
	h5 {
		font-size: 1.125rem;
		line-height: 1.75rem;
	}
	h6 {
		font-size: 1rem;
		line-height: 1.5rem;
	}
	hr {
		margin-top: 0.25rem;
		margin-bottom: 1rem;
		border: none;
		border-radius: 9999px;
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
