import type { AttachmentKind } from '@/entities/attachment/types'

export function getAttachmentKind(mimeType: string): AttachmentKind {
  if (mimeType.startsWith('audio/')) return 'audio'
  if (mimeType.startsWith('video/')) return 'video'
  if (mimeType.startsWith('image/')) return 'image'
  return 'file'
}

export function getAudioFormat(mimeType: string): string | undefined {
  if (mimeType === 'audio/mpeg') return 'mp3'
  if (mimeType === 'audio/wav') return 'wav'
  if (mimeType === 'audio/mp4' || mimeType === 'audio/m4a') return 'm4a'
  return undefined
}

export function convertToBase64(file: File): Promise<string> {
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
