import { http } from './http'

const model = import.meta.env.VITE_OPENROUTER_MODEL

export interface OpenRouterMessage {
  role: 'user' | 'assistant'
  content: string
}

interface OpenRouterResponse {
  choices: {
    message: {
      content: string
    }
  }[]
}

export const openRouterApi = {
  async sendMessage(messages: OpenRouterMessage[]) {
    const response = await http.post<OpenRouterResponse>('/chat/completions', { model, messages })
    return response.data.choices[0]?.message.content
  },
}
