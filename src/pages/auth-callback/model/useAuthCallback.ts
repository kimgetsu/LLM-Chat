import axios from 'axios'
import { useAuthStore } from '@/shared/stores/authStore'
import { router, RouteNames } from '@/app/router'

export function useAuthCallback() {
  const authStore = useAuthStore()

  const exchangeCode = async (code: string, verifier: string) => {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/auth/keys',
      {
        code,
        code_verifier: verifier,
        code_challenge_method: 'S256',
      },
      { headers: { 'Content-Type': 'application/json' } }
    )
    return response.data.key
  }

  const handleAuthCallback = async () => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')

    if (!code) {
      await router.replace({ name: RouteNames.HomePage })
      return
    }

    const verifier = sessionStorage.getItem('pkce_code_verifier')

    if (!verifier) {
      alert('Login session expired, please login again')
      await router.replace({ name: RouteNames.LoginPage })
      return
    }

    try {
      const userKey = await exchangeCode(code, verifier)
      authStore.setUserKey(userKey)
      await router.replace({ name: RouteNames.HomePage })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400 || error.response?.status === 403) {
          alert('Login failed, please try again')
        } else {
          alert('Network error, please try again')
        }
      } else {
        alert('An unexpected error occurred')
      }
      await router.replace({ name: RouteNames.LoginPage })
    } finally {
      sessionStorage.removeItem('pkce_code_verifier')
    }
  }

  return { handleAuthCallback }
}
