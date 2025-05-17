// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  pages: true,
  components: true,
  ssr: false,
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css',
    '@/assets/styles/main.css',
    '@/assets/styles/vuetify-custom.css',
    '@/assets/fonts/IranSans/fontiran.css',
    '@/assets/styles/font-style.css',


  ],
  build: {
    transpile: ['vuetify'],
  },
  App: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/@mdi/font@7.x/css/materialdesignicons.min.css'
        }
      ]
    }
  },
})
