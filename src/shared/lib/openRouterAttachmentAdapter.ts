import type { Attachment } from '../types/attachments'

export function convertAttachmentToOpenRouterBlock(attachment: Attachment): any | null {
  if (attachment.status !== 'ready' || !attachment.source) return null

  const { kind, source, meta } = attachment
  const dataUrl = source.value

  switch (kind) {
    case 'audio': {
      const base64Data = dataUrl.split(',')[1] // Что тут происходит?
      const format = meta?.format || 'mp3'
      return { type: 'input_audio', inputAudio: { data: base64Data, format } }
    }

    case 'video':
      return { type: 'video_url', video_url: { url: dataUrl } }

    case 'image':
      return { type: 'image_url', image_url: { url: dataUrl } }

    case 'file':
      return { type: 'file_url', file: { url: dataUrl } }

    default:
      return null
  }
}
