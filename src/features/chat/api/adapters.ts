import type { Attachment } from '@/entities/attachment/types'
import type { Chat, Message, ServerChat, ServerMessage, ServerAttachment } from '../model/types'
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

export async function attachmentToServerFormat(attachment: Attachment) {
  let data
  if (attachment.source?.type === 'dataUrl') {
    data = attachment.source.value.split(',')[1]
  } else {
    data = await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const result = (reader.result as string).split(',')[1]
        resolve(result)
      }
      reader.onerror = reject
      reader.readAsDataURL(attachment.file!)
    })
  }

  return {
    type: attachment.kind === 'image' ? 'image' : 'file',
    mimeType: attachment.mimeType,
    data,
  }
}
