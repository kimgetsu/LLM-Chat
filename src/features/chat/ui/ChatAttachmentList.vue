<template>
  <div v-if="props.attachments.length > 0" class="attach-list">
    <div
      v-for="attachment in props.attachments"
      :key="attachment.id"
      :class="['attach-item', readonly ? 'readonly' : '']"
    >
      <span class="item-info">
        <component :is="getAttachmentIcon(attachment.kind)" />
      </span>

      <span class="file-name">{{ attachment.fileName }}</span>

      <span class="item-action">
        <span> {{ formatBytes(attachment.size) }} </span>
        <span v-if="!readonly">
          <span v-if="attachment.status === 'converting'"> <LoadingIcon /> </span>
          <span v-if="attachment.status === 'error'"> <ErrorIcon /> </span>
          <button class="remove-btn" @click="emit('remove', attachment.id)"><CloseIcon /></button>
        </span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import CloseIcon from '@/shared/assets/icons/CloseIcon.svg'
import ErrorIcon from '@/shared/assets/icons/ErrorIcon.svg'
import LoadingIcon from '@/shared/assets/icons/LoadingIcon.svg'
import MusicIcon from '@/shared/assets/icons/MusicIcon.svg'
import VideoIcon from '@/shared/assets/icons/VideoIcon.svg'
import FileIcon from '@/shared/assets/icons/FileIcon.svg'
import ImageIcon from '@/shared/assets/icons/ImageIcon.svg'
import type { Attachment, AttachmentKind } from '@/entities/attachment/types'
import { formatBytes } from '@/shared/lib/formatBytes'

const props = defineProps<{ attachments: Attachment[]; readonly: boolean }>()
const emit = defineEmits<{ (e: 'remove', id: string): void }>()

const assertNever = (kind: never): never => {
  throw new Error(`Unexpected kind: ${kind}`)
}

const getAttachmentIcon = (kind: AttachmentKind) => {
  switch (kind) {
    case 'audio':
      return MusicIcon
    case 'video':
      return VideoIcon
    case 'image':
      return ImageIcon
    case 'file':
      return FileIcon
    default:
      return assertNever(kind)
  }
}
</script>

<style scoped>
.attach-list {
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
  margin-bottom: 8px;
}

.attach-item {
  max-width: 574px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 6px 12px;
  border: 1px solid var(--neutral-400);
  box-shadow: var(--sh-neutral-regular);
  background-color: var(--secondary-200);
  border-radius: 10px;
  font-size: 14px;
}

.file-name {
  overflow: hidden;
  text-overflow: ellipsis;
}

.remove-btn {
  background: none;
  border: none;
  margin-left: 8px;
}

.remove-btn:hover {
  cursor: pointer;
}

.item-info,
.item-action {
  flex: none;
}

.item-action {
  position: relative;
}

.readonly {
  background: var(--neutral-100);
  padding-top: 12px;
  padding-bottom: 12px;
}
</style>
