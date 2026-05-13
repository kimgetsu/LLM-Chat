import type { Attachment } from '@/entities/attachment/types'

export type Role = 'user' | 'assistant'
export type MessageStatus = 'ok' | 'pending' | 'failed'

export interface Chat {
  id: string
  title: string
  createdAt: number
  updatedAt: number
}

export interface BaseMessage {
  chatId: string
  role: Role
  content: string
  attachments?: Attachment[]
  status?: MessageStatus
  requestId?: string
}

export interface Message extends BaseMessage {
  id: string
  createdAt: number
  status: MessageStatus
}

export interface ChatsResponse {
  data: ServerChat[]
  nextCursor: string | null
}

export interface MessageResponse {
  data: ServerMessage[]
  nextCursor: string | null
}

export interface ServerChat {
  id: string
  title: string
  createdAt: string
  updatedAt: string
}

export interface ServerAttachment {
  type: 'image' | 'file'
  mimeType: string
  url?: string
  data?: string
}

export interface ServerMessage {
  id: string
  chatId: string
  role: 'user' | 'assistant'
  content: string
  status: 'ok' | 'pending' | 'failed'
  createdAt: string
  attachments?: ServerAttachment[]
  requestId?: string
}

export type CreateChatResponse = {
  data: ServerChat
}
