// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@vite-pwa/nuxt', '@nuxt/image-edge', '@nuxt/content', '@nuxtjs/tailwindcss', 'nuxt-icon', '@nuxtjs/google-fonts', 'nuxt-swiper', '@nuxtjs/html-validator'],
  plugins: [{ src: '~/plugins/products.js', ssr: false }, { src: '~/plugins/isCursorAviable.js' }],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Соцветие • Интернет-магазин',
      link: [
        { rel: 'canonical', href: 'https://<SITE.COM>/shop' }
      ],
      meta: [
        { name: 'robots', content: 'index, follow' },
        { property: 'og:title', content: 'Соцветие • Интернет-магазин' },
        { property: 'og:description', content: 'Мы не скрываем того, из чего именно собран наш чай.' },
        { property: 'og:image', content: '/my-image.jpg' },
        { name: 'author', content: '<ИМЯ АВТОРА>' },
        { name: 'publisher', content: 'Raccoon IT Group' },
        { name: 'language', content: 'ru' }
      ]
    },
  },
  image: {
    placeholder: {
      format: 'png',
      width: 20,
      height: 20,
      fit: 'cover',
      quality: 100,
      webp: false,
      generate: {
        format: 'png',
        width: 100,
        height: 100,
        colors: ['#bfd400', '#4f501d']
    }
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
          sizes: '128x128'
        }
      ],
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#ffffff'
    }
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/api\.myapp\.com/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 7 // 1 week
            }
          }
        },
        {
          urlPattern: /\.(png|jpg|jpeg|svg|gif)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'image-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
            }
          }
        }
      ]
    }
  },
  icon: {
    size: '32px',
    class: 'icon',
    aliases: {}
  },
  googleFonts: {
    families: {
      Montserrat: {
        wght: [400, 700],
        ital: [400]
      },
    }
  }
})