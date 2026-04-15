import type {
  Attachment,
  StoredAttachment,
  OpenRouterContentBlock,
} from '@/entities/attachment/types'
import { assertNever } from '@/entities/attachment/utils'

export function convertAttachmentToOpenRouterBlock(
  attachment: Attachment
): OpenRouterContentBlock | null {
  if (attachment.status !== 'ready' || !attachment.source) return null

  const { kind, source, meta } = attachment
  const dataUrl = source.value

  switch (kind) {
    case 'audio': {
      const base64Data = dataUrl.split(',')[1]
      const format = meta?.format || 'mp3'
      if (!base64Data) return null
      return { type: 'input_audio', inputAudio: { data: base64Data, format } }
    }

    case 'video':
      return { type: 'video_url', video_url: { url: dataUrl } }

    case 'image':
      return { type: 'image_url', image_url: { url: dataUrl } }

    case 'file':
      return { type: 'file_url', file: { url: dataUrl } }

    default:
      return assertNever(kind)
  }
}

export function toStoredAttachment(a: Attachment): StoredAttachment {
  return {
    id: a.id,
    kind: a.kind,
    mimeType: a.mimeType,
    fileName: a.fileName,
    size: a.size,
    status: a.status,
    source: a.source?.type === 'url' ? a.source : undefined,
    meta: a.meta,
  }
}
