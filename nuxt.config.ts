import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  $meta: {
    name: 'landify-base',
  },
  compatibilityDate: '2026-08-25',
  modules: ['@nuxt/image'],
  components: [
    {
      path: join(currentDir, './app/components'),
      ignore: ['ui/button/**', 'ui/card/**'],
    },
  ],
  css: [join(currentDir, './app/assets/css/main.css')],
  typescript: {
    strict: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
