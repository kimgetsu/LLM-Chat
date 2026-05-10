import { createApp } from 'vue'
import './style.css'
import App from './app/App.vue'
import { pinia } from './app/providers/store'
import { router } from './app/router'
import '@/shared/assets/css/variables.css'
import { VueQueryPlugin } from '@tanstack/vue-query'

createApp(App).use(pinia).use(router).use(VueQueryPlugin).mount('#app')
