import { router } from '@/app/router'
import { exchangeCode } from '../api/authApi'
import { useAuthStore } from '../stores/authStore'
import axios from 'axios'

export async function handleAuthCallback() {
  const { setUserKey } = useAuthStore()
  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')

  if (!code) return

  const verifier = sessionStorage.getItem('pkce_code_verifier')

  if (!verifier) {
    alert('Login session expired, please login again')
    window.location.href = '/login'
    return
  }

  try {
    const userKey = await exchangeCode(code, verifier)

    setUserKey(userKey)

    sessionStorage.removeItem('pkce_code_verifier')
    router.replace('/')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400 || error.response?.status === 403) {
        alert('Login failed, please try again')
      } else {
        alert('Network error, please try again')
      }
    }
    sessionStorage.removeItem('pkce_code_verifier')
    window.location.href = '/login'
  }
}
