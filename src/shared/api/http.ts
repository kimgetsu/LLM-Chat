import axios from 'axios'
import { useAuthStore } from '../stores/authStore'

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
    }
    return Promise.reject(error)
  }
)
