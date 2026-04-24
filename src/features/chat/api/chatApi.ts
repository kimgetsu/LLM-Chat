import { api } from '@/shared/api/http'
import { transformServerChat, transformServerMessage } from '@/features/chat/model/helpers'
import type { ChatsResponse, CreateChatResponse, MessageResponse } from '../model/types'

export async function fetchChatsFromApi(cursor?: string | null) {
  try {
    const response = await api.get<ChatsResponse>(`/chats?limit=20&cursor=${cursor ?? ''}`)
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
    const response = await api.get<MessageResponse>(
      `/chats/${chatId}/messages?limit=50&cursor=${cursor ?? ''}&order=asc`
    )
    const currentChatInfo = response.data
    const newMessages = currentChatInfo.data.map(transformServerMessage)
    return { newMessages, nextCursor: currentChatInfo.nextCursor }
  } catch (err) {
    throw err
  }
}
