import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import type { Attachment } from '@/entities/attachment/types'
import { convertAttachmentToOpenRouterBlock } from '@/entities/attachment/adapter'
import { getAttachmentKind, getAudioFormat, convertToBase64 } from '@/entities/attachment/utils'
import {
  ALLOWED_MIME_TYPES_FLAT,
  MAX_FILE_SIZE,
  MAX_FILE_COUNT,
} from '@/entities/attachment/constants'

export function useChatFiles() {
  const attachments = ref<Attachment[]>([])

  function addFiles(files: File[]) {
    if (attachments.value.length + files.length > MAX_FILE_COUNT) {
      alert(`Maximum ${MAX_FILE_COUNT} files allowed`)
      return
    }

    const newAttachments: Attachment[] = []

    for (const file of files) {
      if (!ALLOWED_MIME_TYPES_FLAT.includes(file.type)) {
        alert(`Unsupported file type: ${file.type}`)
        continue
      }

      if (file.size > MAX_FILE_SIZE) {
        alert(`File ${file.name} is too large (max ${MAX_FILE_SIZE / 1024 / 1024}MB)`)
        continue
      }

      const kind = getAttachmentKind(file.type)

      const attachment: Attachment = {
        id: uuidv4(),
        kind,
        file,
        mimeType: file.type,
        fileName: file.name,
        size: file.size,
        status: 'pending',
      }

      if (kind === 'audio') {
        const format = getAudioFormat(file.type)
        if (format) {
          attachment.meta = { format }
        }
      }

      newAttachments.push(attachment)
    }

    attachments.value = [...attachments.value, ...newAttachments]

    for (const attachment of newAttachments) {
      convertAttachment(attachment)
    }
  }

  function removeAttachment(id: string) {
    attachments.value = attachments.value.filter(a => a.id !== id)
  }

  function clearAttachments() {
    attachments.value = []
  }

  async function convertAttachment(attachment: Attachment) {
    const updateAttachment = (status: Attachment['status'], dataUrl?: string) => {
      const index = attachments.value.findIndex(a => a.id === attachment.id)
      if (index !== -1) {
        const target = attachments.value[index]
        if (target) {
          target.status = status
          if (dataUrl !== undefined) {
            target.source = {
              type: 'dataUrl',
              value: dataUrl,
            }
          }
        }
      }
    }

    updateAttachment('converting')

    try {
      const dataUrl = await convertToBase64(attachment.file)
      updateAttachment('ready', dataUrl)
    } catch (error) {
      updateAttachment('error')
    }
  }

  function getAttachmentsForApi() {
    return attachments.value
      .filter(a => a.status === 'ready' && a.source)
      .map(a => convertAttachmentToOpenRouterBlock(a))
      .filter(Boolean)
  }

  return { attachments, addFiles, removeAttachment, clearAttachments, getAttachmentsForApi }
}
