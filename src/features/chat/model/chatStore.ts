import { defineStore } from 'pinia'
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import type { Attachment } from '@/entities/attachment/types'
import type { Message, BaseMessage } from './types'

export const useChatStore = defineStore('chat', () => {
  const messagesByChatId = ref<Record<string, Message[]>>({})
  const loadingByChatId = ref<Record<string, boolean>>({})
  const errorByChatId = ref<Record<string, string | null>>({})

  function setChatError(chatId: string, error: string | null) {
    errorByChatId.value[chatId] = error
  }

  function addMessage(data: BaseMessage): Message {
    const message: Message = {
      ...data,
      id: uuidv4(),
      createdAt: Date.now(),
      status: data.status ?? 'ok',
    }

    let messages = messagesByChatId.value[data.chatId]
    if (!messages) {
      messages = []
      messagesByChatId.value[data.chatId] = messages
    }
    messages.push(message)

    return message
  }

  async function sendMessage(
    chatId: string,
    text: string,
    attachments: Attachment[] = [],
    options?: { isRetry?: boolean; requestId?: string }
  ) {
    if (!text && attachments.length === 0) return

    const requestId = options?.requestId ?? uuidv4()

    if (!options?.isRetry) {
      addMessage({
        chatId,
        role: 'user',
        content: text,
        attachments,
        status: 'ok',
        requestId,
      })
    }

    loadingByChatId.value[chatId] = true
    setChatError(chatId, null)

    try {
      const allMessages = messagesByChatId.value[chatId] ?? []
      const historyMessages = buildHistoryMessages(allMessages, options)
      const messages = [
        ...historyMessages,
        { role: 'user' as const, content: buildCurrentContent(attachments, text) },
      ]

      const response = await openRouterApi.sendMessage(messages)
      const assistantText = response.data.choices[0]?.message.content ?? ''

      addMessage({
        chatId,
        role: 'assistant',
        content: assistantText,
        status: 'ok',
        requestId,
      })
    } catch (err) {
      setChatError(chatId, 'Ошибка при обращении к OpenRouter')
    } finally {
      loadingByChatId.value[chatId] = false
    }
  }

  return {
    loadingByChatId,
    errorByChatId,
    sendMessage,
  }
})
