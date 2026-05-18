import { api } from '@/shared/api/http'
import {
  transformServerChat,
  transformServerMessage,
  attachmentToServerFormat,
} from '@/features/chat/api/adapters'
import type { Attachment } from '@/entities/attachment/types'
import type {
  ChatsResponse,
  CreateChatResponse,
  MessageResponse,
  Message,
} from '@/features/chat/model/types'

const DEFAULT_MODEL = import.meta.env.VITE_OPENROUTER_MODEL

export async function fetchChatsFromApi(cursor?: string | null) {
  try {
    const params: Record<string, string> = { limit: '20' }
    if (cursor) params.cursor = cursor
    const response = await api.get<ChatsResponse>('/chats', { params })
    const serverData = response.data
    const transformedChats = serverData.data.map(transformServerChat)
    return { transformedChats, nextCursor: serverData.nextCursor }
  } catch (err) {
    throw err
  }
}

export async function createChatFromApi(title: string) {
  try {
    const response = await api.post<CreateChatResponse>('/chats/create', { title })
    const serverChat = response.data.data
    const chat = transformServerChat(serverChat)
    return chat
  } catch (err) {
    throw err
  }
}

export async function fetchMessagesFromApi(chatId: string, cursor?: string | null) {
  try {
    const params: Record<string, string> = { limit: '50', order: 'asc' }
    if (cursor) params.cursor = cursor
    const response = await api.get<MessageResponse>(`/chats/${chatId}/messages`, { params })
    const currentChatInfo = response.data
    const newMessages = currentChatInfo.data.map(transformServerMessage)
    return { newMessages, nextCursor: currentChatInfo.nextCursor }
  } catch (err) {
    throw err
  }
}

export async function sendMessageToApi(
  chatId: string,
  content: string,
  options?: {
    model?: string
    temperature?: number
    maxTokens?: number
    clientMessageId?: string
    attachments?: Attachment[]
    isRetry?: boolean
    requestId?: string
  }
): Promise<{ userMessage: Message; assistantMessage: Message }> {
  const serverAttachments = options?.attachments?.length
    ? await Promise.all(options.attachments.map(attachmentToServerFormat))
    : undefined

  const response = await api.post(`/chats/${chatId}/sendMessage`, {
    content,
    model: options?.model || DEFAULT_MODEL,
    temperature: options?.temperature,
    maxTokens: options?.maxTokens,
    clientMessageId: options?.clientMessageId,
    attachments: serverAttachments,
  })

  return {
    userMessage: transformServerMessage(response.data.data.userMessage),
    assistantMessage: transformServerMessage(response.data.data.assistantMessage),
  }
}
