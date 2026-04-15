import type { Chat, Message, Request, StoredData, StoredMessage, StoredRequest } from './types'
import { toStoredAttachment } from '@/entities/attachment/adapter'

export const STORAGE_KEY = 'llm_chat_app:v1'
export const CURRENT_VERSION = 1

export function isValidStoredData(data: unknown): data is StoredData {
  if (!data || typeof data !== 'object') return false

  const value = data as Record<string, unknown>

  return (
    value.version === CURRENT_VERSION &&
    Array.isArray(value.chats) &&
    typeof value.messagesByChatId === 'object' &&
    value.messagesByChatId !== null
  )
}

export function stripAttachments(
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

export function stripRequests(
  requestsById: Record<string, Request>
): Record<string, StoredRequest> {
  const result: Record<string, StoredRequest> = {}

  for (const [requestId, request] of Object.entries(requestsById)) {
    result[requestId] = {
      ...request,
      attachments: request.attachments?.map(toStoredAttachment),
    }
  }

  return result
}

export function saveToStorage(
  chats: Chat[],
  messagesByChatId: Record<string, Message[]>,
  requestsById: Record<string, Request>
) {
  const data: StoredData = {
    version: CURRENT_VERSION,
    chats,
    messagesByChatId: stripAttachments(messagesByChatId),
    requestsById: stripRequests(requestsById),
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.error('Error saving to localStorage:', e)
  }
}

export function loadFromStorage(): {
  chats: Chat[]
  messagesByChatId: Record<string, Message[]>
  requestsById: Record<string, Request>
} | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null

    const data = JSON.parse(stored)

    if (!isValidStoredData(data)) {
      return null
    }

    return {
      chats: data.chats,
      messagesByChatId: data.messagesByChatId as Record<string, Message[]>,
      requestsById: (data.requestsById ?? {}) as Record<string, Request>,
    }
  } catch (e) {
    console.error('Error reading from localStorage:', e)
    return null
  }
}
