import axios from 'axios'

export async function exchangeCode(code: string, verifier: string) {
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
