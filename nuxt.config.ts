// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss', 'nuxt-icon', '@nuxtjs/google-fonts', '@element-plus/nuxt', 'nuxt-typed-router', 'nuxt-swiper', '@nuxtjs/html-validator'],
  googleFonts: {
    families: {
      Montserrat: {
        wght: [400, 700],
        ital: [400]
      },
    }
  }
})