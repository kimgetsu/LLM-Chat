import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { pinia } from './stores'
import { router } from './router'
import './assets/css/variables.css'

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')
