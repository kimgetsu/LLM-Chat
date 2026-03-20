import { generateCodeVerifier, generateCodeChallenge } from '../lib'

export async function startOAuth() {
  const verifier = generateCodeVerifier()

  sessionStorage.setItem('pkce_code_verifier', verifier)

  const challenge = await generateCodeChallenge(verifier)

  const redirectUrl = `https://openrouter.ai/auth?callback_url=${window.location.origin}&code_challenge=${challenge}&code_challenge_method=S256`

  window.location.href = redirectUrl
}
