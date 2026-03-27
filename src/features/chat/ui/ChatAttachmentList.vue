<template>
  <div v-if="props.attachments.length > 0" class="attach-list">
    <div v-for="attachment in props.attachments" :key="attachment.id" class="attach-item">
      <span class="item-info">
        <MusicIcon v-if="attachment.kind === 'audio'" />
        <VideoIcon v-else-if="attachment.kind === 'video'" />
        <ImageIcon v-else-if="attachment.kind === 'image'" />
        <FileIcon v-else />
      </span>

      <span class="file-name">{{ attachment.fileName }}</span>

      <span class="item-action">
        <span> <LoadingIcon v-if="attachment.status === 'converting'" /> </span>
        <span> <ErrorIcon v-if="attachment.status === 'error'" /> </span>
        <span> {{ formatBytes(attachment.size, { decimals: 1 }) }} </span>
        <button class="remove-btn" @click="emit('remove', attachment.id)"><CloseIcon /></button>
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
import type { Attachment } from '@/shared/types/attachments'
import { formatBytes } from '@/shared/lib/formatBytes'

const props = defineProps<{ attachments: Attachment[] }>()
const emit = defineEmits<{ (e: 'remove', id: string): void }>()
</script>

<style scoped>
.attach-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
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
  background-color: #f3f4f6;
  border-radius: 9999px;
  font-size: 14px;
}

.file-name {
  overflow: hidden;
  text-overflow: ellipsis;
}

.remove-btn {
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
</style>
