const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY
const model = import.meta.env.VITE_OPENROUTER_MODEL
const baseUrl = import.meta.env.VITE_OPENROUTER_BASE_URL

const url = `${baseUrl}/chat/completions`

export async function testOpenRouter() {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: 'user', content: 'What is 2 + 2? Prove it!' }],
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const data = await response.json()

    const text = data.choices?.[0]?.message?.content

    console.log(text)
  } catch (error) {
    console.error('Request failed:', error.message)
  }
}
