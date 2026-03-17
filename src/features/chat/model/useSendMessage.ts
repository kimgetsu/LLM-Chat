import { ref } from 'vue'
import { openRouterApi } from '../../../shared/api/openRouterApi'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export function useSendMessage() {
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const sendMessage = async (messages: ChatMessage[]) => {
    isLoading.value = true
    error.value = null

    try {
      const messagesForApi = messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      }))
      const response = await openRouterApi.sendMessage(messagesForApi)
      return response.data.choices[0]?.message.content ?? ''
    } catch (err) {
      error.value = 'Ошибка при обращении к OpenRouter'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return { sendMessage, error, isLoading }
}
