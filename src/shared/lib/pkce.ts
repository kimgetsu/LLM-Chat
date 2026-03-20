export function generateCodeVerifier(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  const base64 = btoa(String.fromCharCode(...array))
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

export async function generateCodeChallenge(verifier: string): Promise<string> {
  const uint8 = new TextEncoder()
  const array = uint8.encode(verifier)
  const arrayBuffer = await crypto.subtle.digest('SHA-256', array)
  const hashArray = new Uint8Array(arrayBuffer)
  const result = btoa(String.fromCharCode(...hashArray))
  return result.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}
