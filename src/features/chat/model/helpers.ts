import type { Attachment } from '@/entities/attachment/types'
import type { Message, Role } from './types'
import { convertAttachmentToOpenRouterBlock } from '@/entities/attachment/adapter'
import type { OpenRouterContentBlock } from '@/entities/attachment/types'

export function buildCurrentContent(attachments: Attachment[], text: string) {
  if (attachments.length === 0) {
    return text
  }

  const blocks: OpenRouterContentBlock[] = []

  if (text.trim()) {
    blocks.push({ type: 'text', text })
  }

  for (const attachment of attachments) {
    const block = convertAttachmentToOpenRouterBlock(attachment)
    if (block) blocks.push(block)
  }

  return blocks
}

export function buildHistoryMessages(
  allMessages: Message[],
  options?: { isRetry?: boolean; requestId?: string }
): Array<{ role: Role; content: string | OpenRouterContentBlock[] }> {
  if (!options?.isRetry) {
    return allMessages.slice(0, -1).map(m => ({
      role: m.role,
      content: m.content,
    }))
  }

  const requestId = options.requestId
  const index = allMessages.findIndex(m => m.requestId === requestId && m.role === 'user')

  if (index === -1) {
    return allMessages.map(m => ({
      role: m.role,
      content: m.content,
    }))
  }

  return allMessages.slice(0, index).map(m => ({
    role: m.role,
    content: m.content,
  }))
}
