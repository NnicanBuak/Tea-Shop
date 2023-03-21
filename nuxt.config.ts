// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/image-edge', '@nuxt/content', '@nuxtjs/tailwindcss', 'nuxt-icon', '@nuxtjs/google-fonts', '@element-plus/nuxt', 'nuxt-swiper', '@nuxtjs/html-validator'],
  plugins: [{ src: '~/plugins/products.js', ssr: false }, { src: '~/plugins/isCursorAviable.js' }],
  icon: {
    size: '32px',
    class: 'icon',
    aliases: {}
  },
  elementPlus: {
    icon: false
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