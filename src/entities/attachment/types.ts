export type AttachmentKind = 'audio' | 'video' | 'file' | 'image'

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
  file?: File
  mimeType: string
  fileName: string
  size: number
  status: AttachmentStatus
  source?: AttachmentSource
  meta?: AttachmentMeta
}

export type StoredAttachment = {
  id: string
  kind: AttachmentKind
  mimeType: string
  fileName: string
  size: number
  status: AttachmentStatus
  source?: AttachmentSource
  meta?: AttachmentMeta
}

export type OpenRouterContentBlock =
  | { type: 'text'; text: string }
  | { type: 'image_url'; image_url: { url: string } }
  | { type: 'input_audio'; inputAudio: { data: string; format: string } }
  | { type: 'video_url'; video_url: { url: string } }
  | { type: 'file_url'; file: { url: string } }

export interface OpenRouterMessage {
  role: 'user' | 'assistant'
  content: string | OpenRouterContentBlock[]
}

export interface OpenRouterResponse {
  choices: {
    message: {
      content: string
    }
  }[]
}
