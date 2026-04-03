<template>
  <div :class="['message-container', role]">
    <img :src="role === 'user' ? Avatar : AssistantAvatar" class="avatar" />

    <div class="message-element">
      <div class="header">
        <span class="d-2 medium" v-text="role === 'assistant' ? 'LanguageGUI' : 'Denis Kim'"></span>
        <span class="time d-1 medium">{{ timeStr }}</span>
      </div>

      <div class="content d-1 regular">
        {{ content }}
      </div>
    </div>
  </div>
  <ChatAttachmentList v-if="attachments?.length" :attachments="attachments" readonly />
</template>

<script setup lang="ts">
import Avatar from '@/shared/assets/icons/Avatar.png'
import AssistantAvatar from '@/shared/assets/icons/AssistantAvatar.png'
import { formatTime } from '@/shared/lib'
import { computed } from 'vue'
import ChatAttachmentList from './ChatAttachmentList.vue'
import type { Attachment } from '@/entities/attachment/types'

const mProps = defineProps<{
  role: 'user' | 'assistant'
  content: string
  createdAt: number
  attachments?: Attachment[]
}>()

const timeStr = computed(() => formatTime(mProps.createdAt))
</script>

<style scoped>
.message-container {
  background: var(--neutral-100);
  max-width: 574px;
  width: 100%;
  padding: 24px;
  display: flex;
  margin-bottom: 20px;
}

.user {
  padding: 0;
}

.assistant {
  border-radius: 16px;
  border: 1px solid var(--neutral-400);
  box-shadow: var(--sh-neutral-regular);
  padding: 16px 24px;
}

.avatar {
  margin-right: 12px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.message-element {
  display: flex;
  flex-direction: column;
  padding-right: 24px;

  overflow-wrap: anywhere;
  word-break: break-word;
}

.header {
  display: flex;
  gap: 12px;
}

.time {
  color: var(--neutral-600);
  border-left: 1px solid var(--neutral-300);
  padding-left: 12px;
}

.content {
  color: var(--neutral-600);
  margin-top: 8px;
  overflow-wrap: anywhere;
}
</style>
