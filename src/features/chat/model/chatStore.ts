import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { openRouterApi } from '@/shared/api/openRouterApi'
import type { Attachment } from '@/entities/attachment/types'
import { convertAttachmentToOpenRouterBlock } from '@/entities/attachment/adapter'

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
}

interface Message extends BaseMessage {
  id: string
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

  async function sendMessage(chatId: string, text: string, attachments: Attachment[] = []) {
    if (!text && attachments.length === 0) return

    addMessage({
      chatId,
      role: 'user',
      content: text,
      attachments,
      status: 'sent',
    })

    loadingByChatId.value[chatId] = true
    errorByChatId.value[chatId] = null

    try {
      const historyMessages = (messagesByChatId.value[chatId] ?? []).slice(0, -1).map(m => ({
        role: m.role,
        content: m.content,
      }))

      let currentContent: string | any[]

      if (attachments.length === 0) {
        currentContent = text
      } else {
        const blocks: any[] = []

        if (text.trim()) {
          blocks.push({ type: 'text', text })
        }

        for (const attachment of attachments) {
          const block = convertAttachmentToOpenRouterBlock(attachment)
          if (block) blocks.push(block)
        }

        currentContent = blocks
      }

      const messages = [...historyMessages, { role: 'user' as const, content: currentContent }]

      const response = await openRouterApi.sendMessage(messages)
      const assistantText = response.data.choices[0]?.message.content ?? ''

      addMessage({
        chatId,
        role: 'assistant',
        content: assistantText,
        status: 'sent',
      })
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

  function addMessage(data: BaseMessage): Message {
    const message: Message = {
      id: uuidv4(),
      createdAt: Date.now(),
      status: data.status ?? 'sent',
      ...data,
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

    if (data.role === 'user') {
      const userMessagesCount = messages.filter(m => m.role === 'user').length

      if (userMessagesCount === 1) {
        const shortTitle =
          data.content.length > 30 ? data.content.slice(0, 30) + '..' : data.content
        updateChatTitle(data.chatId, shortTitle)
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
