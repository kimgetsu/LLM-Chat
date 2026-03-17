import axios from 'axios'

const baseUrl = import.meta.env.VITE_OPENROUTER_BASE_URL
const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY

export const http = axios.create({
  baseURL: baseUrl,
  timeout: 30000,
  headers: {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  },
})
