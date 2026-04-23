import type { Attachment } from '@/entities/attachment/types'
import type { Chat, Message, ServerChat, ServerMessage, ServerAttachment } from './types'
import { v4 as uuidv4 } from 'uuid'

export function transformServerAttachment(serverAttachment: ServerAttachment): Attachment {
  return {
    id: uuidv4(),
    kind: serverAttachment.type,
    fileName: serverAttachment.url?.split('/').pop() || 'file',
    mimeType: serverAttachment.mimeType,
    size: 0,
    status: 'ready',
    source: {
      type: 'url',
      value: serverAttachment.url || serverAttachment.data || '',
    },
  }
}

export function transformServerChat(serverChat: ServerChat): Chat {
  return {
    id: serverChat.id,
    title: serverChat.title,
    createdAt: Date.parse(serverChat.createdAt),
    updatedAt: Date.parse(serverChat.updatedAt),
  }
}

export function transformServerMessage(serverMsg: ServerMessage): Message {
  const attachments = serverMsg.attachments?.map(transformServerAttachment)

  const message: Message = {
    id: serverMsg.id,
    chatId: serverMsg.chatId,
    role: serverMsg.role,
    content: serverMsg.content,
    status: serverMsg.status,
    createdAt: Date.parse(serverMsg.createdAt),
    attachments: attachments,
    requestId: serverMsg.requestId,
  }

  return message
}

export function mergeMessages(
  existing: Message[],
  newMessages: Message[],
  prepend: boolean
): Message[] {
  let combined: Message[]

  if (prepend) {
    combined = [...newMessages, ...existing]
  } else {
    combined = [...existing, ...newMessages]
  }

  const uniqueMessages = combined.filter(
    (msg, index, self) => index === self.findIndex(m => m.id === msg.id)
  )

  return uniqueMessages
}
