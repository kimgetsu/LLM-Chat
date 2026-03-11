import { useRouter } from 'vue-router'
import { useChatStore } from '@/stores/chatStore'
import { useSendMessage } from '@/components/ChatArea/model/useSendMessage'

export function useChatNavigation() {
  const router = useRouter()
  const chatStore = useChatStore()
  const { sendMessage } = useSendMessage()

  const createAndOpenChat = async (initialMessage?: string) => {
    const id = chatStore.createChat()

    await router.push(`/chat/${id}`)

    if (initialMessage) {
      chatStore.addMessage(id, 'user', initialMessage)
      const assistantResponse = await sendMessage([
        {
          role: 'user',
          content: initialMessage,
        },
      ])
      chatStore.addMessage(id, 'assistant', assistantResponse)
    }
    return id
  }

  return { createAndOpenChat }
}
