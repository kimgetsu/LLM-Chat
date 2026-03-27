import { http } from './http'

const model = import.meta.env.VITE_OPENROUTER_MODEL

type OpenRouterContentBlock =
  | { type: 'text'; text: string }
  | { type: 'image_url'; image_url: { url: string } }

export interface OpenRouterMessage {
  role: 'user' | 'assistant'
  content: string | OpenRouterContentBlock[]
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
    return await http.post<OpenRouterResponse>('/chat/completions', { model, messages })
  },
}
