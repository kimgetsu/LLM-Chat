import type { StorybookConfig } from '@storybook/vue3-vite'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const config: StorybookConfig = {
  stories: ['../tests/**/*.mdx', '../tests/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@chromatic-com/storybook', '@storybook/addon-vitest'],
  framework: '@storybook/vue3-vite',
  viteFinal: baseConfig => {
    baseConfig.resolve = baseConfig.resolve || {}
    baseConfig.resolve.alias = {
      ...baseConfig.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
    }
    return baseConfig
  },
}

export default config
