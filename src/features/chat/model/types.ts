import type { Attachment, StoredAttachment } from '@/entities/attachment/types'

export type Role = 'user' | 'assistant'
export type MessageStatus = 'sent' | 'pending' | 'error'

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

export interface Request {
  id: string
  chatId: string
  content: string
  attachments?: Attachment[]
}

export type StoredMessage = Omit<Message, 'attachments'> & {
  attachments?: StoredAttachment[]
}

export type StoredRequest = Omit<Request, 'attachments'> & {
  attachments?: StoredAttachment[]
}

export interface StoredData {
  version: number
  chats: Chat[]
  messagesByChatId: Record<string, StoredMessage[]>
  requestsById: Record<string, StoredRequest>
}

export type User = {
  id: string
}
