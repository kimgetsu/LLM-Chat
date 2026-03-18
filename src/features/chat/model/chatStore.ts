import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { openRouterApi } from '@/shared/api/openRouterApi'

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

interface Message {
  id: string
  chatId: string
  role: Role
  content: string
  createdAt: number
  status: MessageStatus
}

export const useChatStore = defineStore('chat', () => {
  const chats = ref<Chat[]>([])
  const messagesByChatId = ref<Record<string, Message[]>>({})
  const initialized = ref(false)
  const loadingByChatId = ref<Record<string, boolean>>({})
  const errorByChatId = ref<Record<string, string | null>>({})

  const sortedChats = computed(() => {
    return [...chats.value].sort((a, b) => b.updatedAt - a.updatedAt)
  })

  async function sendMessage(chatId: string, text: string) {
    if (!text.trim()) return

    addMessage(chatId, 'user', text)

    loadingByChatId.value[chatId] = true
    errorByChatId.value[chatId] = null

    try {
      const messages = (messagesByChatId.value[chatId] ?? []).map(m => ({
        role: m.role,
        content: m.content,
      }))

      const response = await openRouterApi.sendMessage(messages)

      const assistantText = response.data.choices[0]?.message.content ?? ''

      addMessage(chatId, 'assistant', assistantText)
    } catch (err) {
      errorByChatId.value[chatId] = 'Ошибка при обращении к OpenRouter'
    } finally {
      loadingByChatId.value[chatId] = false
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
      messagesByChatId: messagesByChatId.value,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }

  function loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) return resetToDefault()

      const data = JSON.parse(stored)
      const isValid = data.version === CURRENT_VERSION && data.chats && data.messagesByChatId
      if (!isValid) return resetToDefault()

      chats.value = data.chats
      messagesByChatId.value = data.messagesByChatId
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
      saveToStorage()
    }
  }

  function addMessage(
    chatId: string,
    role: Role,
    content: string,
    status: MessageStatus = 'sent'
  ): Message {
    const message: Message = {
      id: uuidv4(),
      chatId,
      role,
      content,
      createdAt: Date.now(),
      status,
    }

    if (!messagesByChatId.value[chatId]) {
      messagesByChatId.value[chatId] = []
    }

    messagesByChatId.value[chatId].push(message)

    const chat = chats.value.find(c => c.id === chatId)

    if (chat) {
      chat.updatedAt = Date.now()
    }

    if (role === 'user') {
      const userMessagesCount = messagesByChatId.value[chatId].filter(m => m.role === 'user').length

      if (userMessagesCount === 1) {
        const shortTitle = content.length > 30 ? content.slice(0, 30) + '..' : content
        updateChatTitle(chatId, shortTitle)
      }
    }
    saveToStorage()
    return message
  }

  // function updateMessage(chatId: string, messageId: string, updates: Partial<Message>) {
  //   const messages = messagesByChatId.value[chatId]
  //   if (!messages) return
  //   const msg = messages.find(m => m.id === messageId)
  //   if (!msg) return
  //   Object.assign(msg, updates)
  //   saveToStorage()
  // }

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
  }
})
