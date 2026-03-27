export const ALLOWED_MIME_TYPES = {
  audio: ['audio/mp3', 'audio/wav', 'audio/m4a', 'audio/mpeg'],
  video: ['video/mp4', 'video/webm'],
  pdf: ['application/pdf'],
  image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
} as const

export const ALLOWED_MIME_TYPES_FLAT: string[] = [
  ...ALLOWED_MIME_TYPES.audio,
  ...ALLOWED_MIME_TYPES.video,
  ...ALLOWED_MIME_TYPES.pdf,
  ...ALLOWED_MIME_TYPES.image,
]

export const MAX_FILE_SIZE = 20 * 1024 * 1024
export const MAX_FILE_COUNT = 5
