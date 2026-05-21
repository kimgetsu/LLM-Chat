import { Sidebar } from '../../src/features/sidebar'
import { createPinia, setActivePinia } from 'pinia'

setActivePinia(createPinia())

export default {
  component: Sidebar,
  title: 'features/sidebar/Sidebar',
}

export const Default = {}
