import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { pinia } from './app/providers/store'
import { router } from './app/router'
import './assets/css/variables.css'

createApp(App).use(pinia).use(router).mount('#app')
