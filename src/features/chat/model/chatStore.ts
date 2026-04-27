import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { mergeMessages } from './helpers'
import {
  createChatFromApi,
  fetchChatsFromApi,
  fetchMessagesFromApi,
} from '@/features/chat/api/chatApi'
import type { Attachment } from '@/entities/attachment/types'
import type { Chat, Message, BaseMessage, Request } from './types'
import { useChatPagination } from './useChatPagination'

export const useChatStore = defineStore('chat', () => {
  const chats = ref<Chat[]>([])
  const messagesByChatId = ref<Record<string, Message[]>>({})
  const loadingByChatId = ref<Record<string, boolean>>({})
  const errorByChatId = ref<Record<string, string | null>>({})
  const activeChatId = ref<string | null>(null)
  const {
    chatsNextCursor,
    chatsHasMore,
    isLoadingMoreChats,
    messagesCursorByChatId,
    messagesHasMoreByChatId,
    isLoadingMoreMessagesByChatId,
    updateChatsPagination,
    setChatLoading,
    updateMessagesPagination,
  } = useChatPagination()

  const sortedChats = computed(() => {
    return [...chats.value].sort((a, b) => b.updatedAt - a.updatedAt)
  })

  async function fetchChats(cursor?: string | null, append: boolean = false) {
    try {
      const { transformedChats, nextCursor } = await fetchChatsFromApi(cursor)

      if (append) {
        chats.value.push(...transformedChats)
      } else {
        chats.value = transformedChats
      }
      updateChatsPagination(nextCursor)
    } catch (err) {
      console.error('Failed to fetch chats: ', err)
    }
  }

  async function loadMoreChats() {
    if (isLoadingMoreChats.value || !chatsHasMore.value) return

    isLoadingMoreChats.value = true

    try {
      await fetchChats(chatsNextCursor.value, true)
    } catch (err) {
      console.error('Error: ', err)
    } finally {
      isLoadingMoreChats.value = false
    }
  }

  async function initializeChats() {
    if (chats.value.length > 0) return
    await fetchChats(null, false)
  }

  function setChatError(chatId: string, error: string | null): void {
    errorByChatId.value[chatId] = error
  }

  async function createChatOnServer(title: string = 'New chat'): Promise<Chat> {
    try {
      const chat = await createChatFromApi(title)
      chats.value.unshift(chat)

      messagesByChatId.value[chat.id] = []
      messagesCursorByChatId.value[chat.id] = null
      messagesHasMoreByChatId.value[chat.id] = false

      return chat
    } catch (err) {
      console.error('Failed to create chat: ', err)
      throw err
    }
  }

  async function fetchMessages(chatId: string, cursor?: string | null, prepend: boolean = false) {
    loadingByChatId.value[chatId] = true

    try {
      const { newMessages, nextCursor } = await fetchMessagesFromApi(chatId, cursor)
      const existing = messagesByChatId.value[chatId] || []

      messagesByChatId.value[chatId] = mergeMessages(existing, newMessages, prepend)

      updateMessagesPagination(chatId, nextCursor)
    } catch (err) {
      console.error('Failed to fetch messages:', err)
      throw err
    } finally {
      loadingByChatId.value[chatId] = false
    }
  }

  async function loadMoreMessages(chatId: string) {
    if (isLoadingMoreMessagesByChatId.value[chatId] || !messagesHasMoreByChatId.value[chatId])
      return
    try {
      setChatLoading(chatId, true)
      await fetchMessages(chatId, messagesCursorByChatId.value[chatId], true)
    } catch (err) {
      console.log('Error: ', err)
    } finally {
      setChatLoading(chatId, false)
    }
  }

  async function selectChat(chatId: string) {
    if (messagesByChatId.value[chatId]?.length) return
    try {
      activeChatId.value = chatId
      await fetchMessages(chatId, null, false)
    } catch (err) {
      console.error('Error: ', err)
      throw err
    }
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

    const request = requestsById.value[requestId] // TODO: 4 задача
    if (!request) return null

    return request
  }

  async function createChat(initialMessage?: string) {
    try {
      const newChat = await createChatOnServer(initialMessage)
      return newChat.id
    } catch (err) {
      console.error('Create chat failed: ', err)
      throw err
    }
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
      // TODO: 4 задача
      // createRequest(requestId, chatId, text, attachments)
    }

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

    setChatLoading(chatId, true)
    setChatError(chatId, null)

    try {
      const allMessages = messagesByChatId.value[chatId] ?? []
      const historyMessages = buildHistoryMessages(allMessages, options) // TODO: 4 задача
      const messages = [
        ...historyMessages,
        { role: 'user' as const, content: buildCurrentContent(attachments, text) }, // TODO: 4 задача
      ]

      const response = await openRouterApi.sendMessage(messages) // TODO: заменить на backend API
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
      setChatLoading(chatId, false)
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

    const messageIndex = messages.findIndex(m => m.id === message.id)

    if (messageIndex === -1) return

    messagesByChatId.value[message.chatId] = messages.slice(0, messageIndex)

    sendMessage(request.chatId, request.content, request.attachments, {
      isRetry: true,
      requestId: message.requestId,
    })
  }

  return {
    chats,
    messagesByChatId,
    loadingByChatId,
    errorByChatId,
    sortedChats,
    activeChatId,
    createChat,
    sendMessage,
    retryMessage, // TODO: Перенос в ChatActive (?)
    canRetryMessage, // TODO: Перенос в ChatActive (?)
    initializeChats,
    loadMoreChats,
    loadMoreMessages,
    selectChat,
  }
})
