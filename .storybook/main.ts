import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import type { StorybookConfig } from '@storybook/vue3-vite'
import vue from '@vitejs/plugin-vue'

const currentDir = dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-a11y'],
  framework: '@storybook/vue3-vite',
  async viteFinal(viteConfig) {
    viteConfig.resolve ??= {}
    viteConfig.resolve.alias = {
      ...(viteConfig.resolve.alias ?? {}),
      '@': join(currentDir, '../app'),
    }
    viteConfig.plugins = [...(viteConfig.plugins ?? []), vue(), tailwindcss()]

    return viteConfig
  },
}

export default config
