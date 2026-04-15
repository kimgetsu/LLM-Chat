import axios from 'axios'
import { useAuthStore } from '../stores/authStore'

const baseUrl = import.meta.env.VITE_OPENROUTER_BASE_URL

export const http = axios.create({
  baseURL: baseUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.request.use(config => {
  const authStore = useAuthStore()

  if (authStore.userKey) {
    config.headers.Authorization = `Bearer ${authStore.userKey}`
  }

  return config
})
