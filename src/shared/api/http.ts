import axios from 'axios'
import { useAuthStore } from '../stores/authStore'
import { router, RouteNames } from '@/app/router'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
})

api.interceptors.response.use(
  response => response,
  error => {
    const authStore = useAuthStore()
    if (error.response?.status === 401) {
      authStore.user = null
      router.push({ name: RouteNames.LoginPage })
    }
    return Promise.reject(error)
  }
)

// import { useAuthStore } from '../stores/authStore'

// const baseUrl = import.meta.env.VITE_OPENROUTER_BASE_URL

// export const http = axios.create({
//   baseURL: baseUrl,
//   timeout: 30000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })

// http.interceptors.request.use(config => {
//   const authStore = useAuthStore()

//   if (authStore.userKey) {
//     config.headers.Authorization = `Bearer ${authStore.userKey}`
//   }

//   return config
// })
