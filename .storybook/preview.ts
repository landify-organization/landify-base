import '../app/assets/css/main.css'

import { withThemeByClassName } from '@storybook/addon-themes'
import type { Preview } from '@storybook/vue3-vite'
import StorybookNuxtImg from './StorybookNuxtImg.vue'

const preview: Preview = {
  setup(app) {
    app.component('NuxtImg', StorybookNuxtImg)
  },
  decorators: [
    withThemeByClassName({
      defaultTheme: 'light',
      themes: {
        dark: 'dark',
        light: '',
      },
    }),
  ],
  parameters: {
    a11y: {
      test: 'todo',
    },
  },
}

export default preview
