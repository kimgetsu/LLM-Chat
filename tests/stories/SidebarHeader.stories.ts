import SidebarHeader from '../../src/features/sidebar/ui/SidebarHeader.vue'
import { createPinia, setActivePinia } from 'pinia'

setActivePinia(createPinia())

export default {
  component: SidebarHeader,
  title: 'features/sidebar/SidebarHeader',
}

export const Default = {}
