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
