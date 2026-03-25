import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import type { Attachment, AttachmentKind } from '@/shared/types/attachments'
import {
  ALLOWED_MIME_TYPES_FLAT,
  MAX_FILE_SIZE,
  MAX_FILE_COUNT,
} from '@/shared/constants/fileTypes'

export function useChatFiles() {
  const attachments = ref<Attachment[]>([])

  function getAttachmentKind(mimeType: string): AttachmentKind {
    if (mimeType.startsWith('audio/')) return 'audio'
    if (mimeType.startsWith('video/')) return 'video'
    return 'file'
  }

  function getAudioFormat(mimeType: string): string | undefined {
    if (mimeType === 'audio/mpeg') return 'mp3'
    if (mimeType === 'audio/wav') return 'wav'
    if (mimeType === 'audio/mp4' || mimeType === 'audio/m4a') return 'm4a'
    return undefined
  }

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

  function convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result)
        } else {
          reject(new Error('Failed to read file as string'))
        }
      }

      reader.onerror = () => reject(new Error('File reading error'))

      reader.readAsDataURL(file)
    })
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

  return { attachments, addFiles, removeAttachment, clearAttachments }
}
