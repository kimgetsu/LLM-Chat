import type { Preview } from '@storybook/vue3-vite'
import { setup } from '@storybook/vue3'
import { VueQueryPlugin } from '@tanstack/vue-query'
import '../src/shared/assets/css/variables.css'
import '../src/style.css'

setup(app => {
  app.use(VueQueryPlugin)
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
