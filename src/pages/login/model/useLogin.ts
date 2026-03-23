import { router, RouteNames } from '@/app/router'

export function useLogin() {
  const generateCodeVerifier = () => {
    const array = new Uint8Array(32)
    crypto.getRandomValues(array)
    const base64 = btoa(String.fromCharCode(...array))
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
  }

  const generateCodeChallenge = async (verifier: string): Promise<string> => {
    const uint8 = new TextEncoder()
    const array = uint8.encode(verifier)
    const arrayBuffer = await crypto.subtle.digest('SHA-256', array)
    const hashArray = new Uint8Array(arrayBuffer)
    const result = btoa(String.fromCharCode(...hashArray))
    return result.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
  }

  const startOAuth = async () => {
    const verifier = generateCodeVerifier()
    sessionStorage.setItem('pkce_code_verifier', verifier)
    const challenge = await generateCodeChallenge(verifier)

    const callbackUrl = new URL(
      router.resolve({ name: RouteNames.AuthCallback }).href,
      window.location.origin
    ).toString()

    const params = new URLSearchParams({
      callback_url: callbackUrl,
      code_challenge: challenge,
      code_challenge_method: 'S256',
    })
    window.location.href = `https://openrouter.ai/auth?${params.toString()}`
  }

  return { startOAuth }
}
