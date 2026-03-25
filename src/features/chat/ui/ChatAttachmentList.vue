<template>
  <div v-if="attachments.length > 0" class="attach-list">
    <div v-for="attachment in attachments" :key="attachment.id" class="attach-item">
      <span>
        <MusicIcon v-if="attachment.kind === 'audio'" />
        <VideoIcon v-else-if="attachment.kind === 'video'" />
        <FileIcon v-else />
      </span>
      <span> {{ attachment.fileName }} </span>
      <span> <LoadingIcon v-if="attachment.status === 'converting'" /> </span>
      <span> <ErrorIcon v-if="attachment.status === 'error'" /> </span>
      <button @click="removeAttachment(attachment.id)"><CloseIcon /></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChatFiles } from '../model/useChatFiles'
import CloseIcon from '@/shared/assets/icons/CloseIcon.svg'
import ErrorIcon from '@/shared/assets/icons/ErrorIcon.svg'
import LoadingIcon from '@/shared/assets/icons/LoadingIcon.svg'
import MusicIcon from '@/shared/assets/icons/MusicIcon.svg'
import VideoIcon from '@/shared/assets/icons/VideoIcon.svg'
import FileIcon from '@/shared/assets/icons/FileIcon.svg'

const { attachments, removeAttachment } = useChatFiles()
console.log('attachments in ChatAttachmentList:', attachments.value)
</script>
.attach-list { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px; } .attach-item {
display: flex; align-items: center; gap: 8px; padding: 4px 8px; background-color: #f3f4f6;
border-radius: 9999px; font-size: 14px; }
<style scoped></style>
