import { http } from './http'
import type { OpenRouterMessage, OpenRouterResponse } from '@/entities/attachment/types'

const model = import.meta.env.VITE_OPENROUTER_MODEL

export const openRouterApi = {
  async sendMessage(messages: OpenRouterMessage[]) {
    return await http.post<OpenRouterResponse>('/chat/completions', { model, messages })
  },
}
