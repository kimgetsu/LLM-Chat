export type AttachmentKind = 'audio' | 'video' | 'file'

export type AttachmentStatus = 'pending' | 'converting' | 'ready' | 'error'

export interface AttachmentSource {
  type: 'dataUrl' | 'base64' | 'url'
  value: string
}

export interface AttachmentMeta {
  durationMs?: number
  format?: string
}

export interface Attachment {
  id: string
  kind: AttachmentKind
  file: File
  mimeType: string
  fileName: string
  size: number
  status: AttachmentStatus
  source?: AttachmentSource
  meta?: AttachmentMeta
}
