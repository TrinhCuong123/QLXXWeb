import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@primevue/nuxt-module',
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    '@nuxtjs/leaflet',
    '@nuxtjs/google-fonts',
    'nuxt-maplibre'
  ],
  primevue: {
      options: {
        theme: {
          preset: Aura,
          options: {
              prefix: 'p',
              darkModeSelector: null, // Vô hiệu hóa dark mode
              cssLayer: false
          }
      }
    }
  },
  nitro: {
    routes: {
      '/': { redirect: '/login' }, // Thay thế bằng trang bạn muốn chuyển hướng
    },
  },
  css: [
    '~/assets/css/main.css',
  ]
})