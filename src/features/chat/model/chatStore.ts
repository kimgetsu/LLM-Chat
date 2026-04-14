import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { openRouterApi } from '@/shared/api/openRouterApi'
import type { Attachment } from '@/entities/attachment/types'
import type { Chat, Message, BaseMessage, Request } from './types'
import { buildCurrentContent, buildHistoryMessages } from './helpers'
import { saveToStorage, loadFromStorage } from './storage'

export const useChatStore = defineStore('chat', () => {
  const chats = ref<Chat[]>([])
  const messagesByChatId = ref<Record<string, Message[]>>({})
  const initialized = ref(false)
  const loadingByChatId = ref<Record<string, boolean>>({})
  const errorByChatId = ref<Record<string, string | null>>({})
  const requestsById = ref<Record<string, Request>>({})

  const sortedChats = computed(() => {
    return [...chats.value].sort((a, b) => b.updatedAt - a.updatedAt)
  })

  function resetToDefault() {
    chats.value = []
    messagesByChatId.value = {}
    requestsById.value = {}
  }

  function persistToStorage() {
    saveToStorage(chats.value, messagesByChatId.value, requestsById.value)
  }

  function setChatLoading(chatId: string, value: boolean): void {
    loadingByChatId.value[chatId] = value
  }

  function setChatError(chatId: string, error: string | null): void {
    errorByChatId.value[chatId] = error
  }

  function createRequest(
    requestId: string,
    chatId: string,
    text: string,
    attachments: Attachment[] = []
  ) {
    requestsById.value[requestId] = {
      id: requestId,
      chatId,
      content: text,
      attachments,
    }
  }

  function addMessage(data: BaseMessage): Message {
    const message: Message = {
      ...data,
      id: uuidv4(),
      createdAt: Date.now(),
      status: data.status ?? 'sent',
    }

    let messages = messagesByChatId.value[data.chatId]
    if (!messages) {
      messages = []
      messagesByChatId.value[data.chatId] = messages
    }

    messages.push(message)

    const chat = chats.value.find(c => c.id === data.chatId)
    if (chat) {
      chat.updatedAt = Date.now()
    }

    return message
  }

  function updateChatTitle(chatId: string, title: string) {
    const chat = chats.value.find(c => c.id === chatId)
    if (chat) {
      chat.title = title
      chat.updatedAt = Date.now()
    }
  }

  function maybeUpdateChatTitle(chatId: string, text: string) {
    const messages = messagesByChatId.value[chatId] || []
    const userMessagesCount = messages.filter(m => m.role === 'user').length - 1

    if (userMessagesCount === 0) {
      const shortTitle = text.length > 30 ? text.slice(0, 30) + '...' : text
      updateChatTitle(chatId, shortTitle)
    }
  }

  function getRetryRequest(message: Message): Request | null {
    if (message.role !== 'assistant') return null

    const messages = messagesByChatId.value[message.chatId]
    if (!messages) return null

    const messageIndex = messages.findIndex(m => m.id === message.id)
    if (messageIndex <= 0) return null

    const userMessage = messages[messageIndex - 1]
    if (userMessage?.attachments?.length) return null

    const requestId = message.requestId
    if (!requestId) return null

    const request = requestsById.value[requestId]
    if (!request) return null

    return request
  }

  function loadFromStorageHandler() {
    const stored = loadFromStorage()

    if (stored) {
      chats.value = stored.chats
      messagesByChatId.value = stored.messagesByChatId
      requestsById.value = stored.requestsById
    } else {
      resetToDefault()
    }

    initialized.value = true
  }

  function createChat() {
    const id = uuidv4()
    const now = Date.now()

    const newChat: Chat = {
      id,
      title: 'New Chat',
      createdAt: now,
      updatedAt: now,
    }

    chats.value.push(newChat)
    messagesByChatId.value[id] = []
    persistToStorage()
    return id
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
      createRequest(requestId, chatId, text, attachments)
    }

    if (!options?.isRetry) {
      addMessage({
        chatId,
        role: 'user',
        content: text,
        attachments,
        status: 'sent',
        requestId,
      })
    }

    maybeUpdateChatTitle(chatId, text)
    setChatLoading(chatId, true)
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
        status: 'sent',
        requestId,
      })
    } catch (err) {
      setChatError(chatId, 'Ошибка при обращении к OpenRouter')
    } finally {
      setChatLoading(chatId, false)
      persistToStorage()
    }
  }

  function canRetryMessage(message: Message): boolean {
    return getRetryRequest(message) !== null
  }

  function retryMessage(message: Message) {
    const request = getRetryRequest(message)

    if (!request) {
      console.warn('Retry disabled: invalid request or message has attachments')
      return
    }

    const messages = messagesByChatId.value[message.chatId]
    if (!messages) return

    messagesByChatId.value[message.chatId] = messages.filter(m => m.requestId !== message.requestId)

    persistToStorage()

    sendMessage(request.chatId, request.content, request.attachments, {
      isRetry: true,
      requestId: message.requestId,
    })
  }

  return {
    chats,
    messagesByChatId,
    initialized,
    loadingByChatId,
    errorByChatId,
    sortedChats,
    loadFromStorage: loadFromStorageHandler,
    createChat,
    sendMessage,
    retryMessage,
    canRetryMessage,
  }
})
