import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { openRouterApi } from '@/shared/api/openRouterApi'
import type {
  Attachment,
  StoredAttachment,
  OpenRouterContentBlock,
} from '@/entities/attachment/types'
import {
  convertAttachmentToOpenRouterBlock,
  toStoredAttachment,
} from '@/entities/attachment/adapter'

const STORAGE_KEY = 'llm_chat_app:v1'
const CURRENT_VERSION = 1

type Role = 'user' | 'assistant'
type MessageStatus = 'sent' | 'pending' | 'error'

interface Chat {
  id: string
  title: string
  createdAt: number
  updatedAt: number
}

interface BaseMessage {
  chatId: string
  role: Role
  content: string
  attachments?: Attachment[]
  status?: MessageStatus
  requestId?: string
}

interface Message extends BaseMessage {
  id: string
  createdAt: number
  status: MessageStatus
}

type Request = {
  id: string
  chatId: string
  content: string
  attachments?: Attachment[]
}

type StoredMessage = Omit<Message, 'attachments'> & {
  attachments?: StoredAttachment[]
}

type StoredRequest = Omit<Request, 'attachments'> & {
  attachments?: StoredAttachment[]
}

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

  function buildCurrentContent(attachments: Attachment[], text: string) {
    if (attachments.length === 0) {
      return text
    } else {
      const blocks: OpenRouterContentBlock[] = []

      if (text.trim()) {
        blocks.push({ type: 'text', text })
      }

      for (const attachment of attachments) {
        const block = convertAttachmentToOpenRouterBlock(attachment)
        if (block) blocks.push(block)
      }

      return blocks
    }
  }

  function buildHistoryMessages(
    allMessages: Message[],
    options?: { isRetry?: boolean; requestId?: string }
  ) {
    if (!options?.isRetry) {
      return allMessages.slice(0, -1).map(m => ({
        role: m.role,
        content: m.content,
      }))
    } else {
      const requestId = options.requestId
      const index = allMessages.findIndex(m => m.requestId === requestId && m.role === 'user')

      if (index === -1) {
        return allMessages.map(m => ({
          role: m.role,
          content: m.content,
        }))
      } else {
        return allMessages.slice(0, index).map(m => ({
          role: m.role,
          content: m.content,
        }))
      }
    }
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

  function setChatLoading(chatId: string, value: boolean): void {
    loadingByChatId.value[chatId] = value
  }

  function setChatError(chatId: string, error: string | null): void {
    errorByChatId.value[chatId] = error
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
      saveToStorage()
    }
  }

  function resetToDefault() {
    chats.value = []
    messagesByChatId.value = {}
  }

  function saveToStorage() {
    const data = {
      version: CURRENT_VERSION,
      chats: chats.value,
      messagesByChatId: stripAttachments(messagesByChatId.value),
      requestsById: stripRequests(requestsById.value),
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (e) {
      console.error('Error:', e)
    }
  }

  function isValidStoredData(data: unknown): data is {
    version: number
    chats: Chat[]
    messagesByChatId: Record<string, Message[]>
    requestsById?: Record<string, Request>
  } {
    if (!data || typeof data !== 'object') return false

    const value = data as Record<string, unknown>

    return (
      value.version === CURRENT_VERSION &&
      Array.isArray(value.chats) &&
      typeof value.messagesByChatId === 'object' &&
      value.messagesByChatId !== null
    )
  }

  function loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) return resetToDefault()

      const data = JSON.parse(stored)

      if (!isValidStoredData(data)) {
        return resetToDefault()
      }

      chats.value = data.chats
      messagesByChatId.value = data.messagesByChatId as Record<string, Message[]>
      requestsById.value = (data.requestsById ?? {}) as Record<string, Request>
    } catch (e) {
      console.error('Ошибка чтения localStorage', e)
      resetToDefault()
    } finally {
      initialized.value = true
    }
  }

  function createChat() {
    const id = uuidv4()
    const now = Date.now()

    const newChat = {
      id,
      title: 'New Chat',
      createdAt: now,
      updatedAt: now,
    }

    chats.value.push(newChat)
    messagesByChatId.value[id] = []
    saveToStorage()
    return id
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

    saveToStorage()
    sendMessage(request.chatId, request.content, request.attachments, {
      isRetry: true,
      requestId: message.requestId,
    })
  }

  function stripAttachments(
    messagesByChatId: Record<string, Message[]>
  ): Record<string, StoredMessage[]> {
    const result: Record<string, StoredMessage[]> = {}

    for (const [chatId, messages] of Object.entries(messagesByChatId)) {
      result[chatId] = messages.map(m => ({
        ...m,
        attachments: m.attachments?.map(toStoredAttachment),
      }))
    }

    return result
  }

  function stripRequests(requestsById: Record<string, Request>): Record<string, StoredRequest> {
    const result: Record<string, StoredRequest> = {}

    for (const [requestId, request] of Object.entries(requestsById)) {
      result[requestId] = {
        ...request,
        attachments: request.attachments?.map(toStoredAttachment),
      }
    }

    return result
  }

  return {
    chats,
    messagesByChatId,
    initialized,
    sortedChats,
    loadFromStorage,
    createChat,
    sendMessage,
    loadingByChatId,
    errorByChatId,
    retryMessage,
    canRetryMessage,
  }
})
