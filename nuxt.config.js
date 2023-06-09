// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: true,
	vite: { server: { hmr: { overlay: false } } },
	build: {
		publicPath: 'public_html/',
	},
	modules: [
		'@vueuse/nuxt',
		'@vite-pwa/nuxt',
		'@nuxt/content',
		'@nuxt/image-edge',
		'@nuxt/devtools',
		'@nuxtjs/supabase',
		'@nuxtjs/tailwindcss',
		'@nuxtjs/html-validator',
		'@nuxtjs/device',
		'nuxt-icon',
		'nuxt-swiper',
		'nuxt-lodash',
	],
	components: { path: '~/components', pathPrefix: false },
	css: ['assets/css/main.css'],
	app: {
		pageTransition: { name: 'page', mode: 'out-in' },
		head: {
			title: 'Соцветие • Интернет-магазин',
			link: [
				{ rel: 'canonical', href: 'https://<SITE.COM>/shop' },
				{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
				{ rel: 'preconnect', href: 'https://fonts.gstatic.com' },
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Nanum+Gothic:wght@700;800&display=swap',
				},
			],
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
	nitro: {
		compressPublicAssets: true,
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
	tailwindcss: {
		viewer: false,
		exposeConfig: true,
	},
	device: {
		refreshOnResize: true,
	},
	icon: {
		size: '16px',
		class: 'icon',
	},
	// googleFonts: {
	// 	families: {
	// 		'EB+Garamond': {
	// 			wght: [400, 700],
	// 			ital: [400],
	// 		},
	// 		'Fira+Sans': {
	// 			wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
	// 			ital: [100, 200, 300, 400, 500, 600, 700, 800, 900],
	// 		},
	// 		'Nanum+Gothic': {
	// 			wght: [700, 800],
	// 		},
	// 	},
	// },
	lodash: {
		prefix: '_',
		upperAfterPrefix: false,
	},
})
