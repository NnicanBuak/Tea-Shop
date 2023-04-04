// https://nuxt.com/docs/api/configuration/nuxt-config
const colors = require('tailwindcss/colors')

export default defineNuxtConfig({
	modules: [
		'@vueuse/nuxt',
		'@vite-pwa/nuxt',
		'@nuxt/content',
		'@nuxt/image-edge',
		'@nuxt/devtools',
		'@nuxtjs/tailwindcss',
		'@nuxtjs/google-fonts',
		'@nuxtjs/html-validator',
		'@nuxtjs/device',
		'nuxt-icon',
		'nuxt-swiper',
	],
	app: {
		pageTransition: { name: 'page', mode: 'out-in' },
		head: {
			title: 'Соцветие • Интернет-магазин',
			link: [{ rel: 'canonical', href: 'https://<SITE.COM>/shop' }],
			htmlAttrs: {
				lang: 'ru',
			},
			meta: [
				{ name: 'robots', content: 'index, follow' },
				{ property: 'og:title', content: 'Соцветие • Интернет-магазин' },
				{
					property: 'og:description',
					content: 'Мы не скрываем того, из чего именно собран наш чай.',
				},
				{ property: 'og:image', content: '/my-image.jpg' },
				{ name: 'author', content: '<ИМЯ АВТОРА>' },
				{ name: 'publisher', content: 'Raccoon IT Group' },
				{ name: 'language', content: 'ru' },
			],
		},
	},
	pwa: {
		manifest: {
			name: 'Соцветие • Интернет-магазин',
			short_name: 'Соцветие',
			description: 'Мы не скрываем того, из чего именно собран наш чай.',
			lang: 'ru',
			icons: [
				{
					src: 'favicon.ico',
					sizes: '128x128',
				},
			],
			start_url: '/shop',
			display: 'standalone',
			background_color: '#ffffff',
			theme_color: '#ffffff',
		},
		workbox: {
			runtimeCaching: [
				{
					urlPattern: /\.(png|jpg|jpeg|svg|gif)$/,
					handler: 'CacheFirst',
					options: {
						cacheName: 'image-cache',
						expiration: {
							maxEntries: 50,
							maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
						},
					},
				},
			],
		},
	},
	icon: {
		size: '32px',
		class: 'icon',
	},
	googleFonts: {
		families: {
			'EB+Garamond': {
				wght: [400, 700],
				ital: [400],
			},
			Montserrat: {
				wght: [400, 700],
				ital: [400],
			},
		},
	},
})
