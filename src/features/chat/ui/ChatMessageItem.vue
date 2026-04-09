<template>
  <div :class="['message-container', role]">
    <div class="message-header">
      <img :src="role === 'user' ? Avatar : AssistantAvatar" class="avatar" />
      <div class="message-element">
        <div class="header">
          <span
            class="d-2 medium"
            v-text="role === 'assistant' ? 'LanguageGUI' : 'Denis Kim'"
          ></span>
          <span class="time d-1 medium">{{ timeStr }}</span>
        </div>
        <div class="content d-1 regular">
          {{ content }}
        </div>
      </div>
    </div>

    <ChatAttachmentList
      v-if="attachments?.length"
      :attachments="attachments"
      readonly
      class="attachment"
    />

    <div class="message-actions" v-if="role === 'assistant'">
      <UiButton
        :variant="ButtonVariant.Tertiary"
        :size="ButtonSize.Small"
        :onlyIcon="true"
        class="ui-btn"
        @click="copyingContent(content)"
        :title="isCopied ? 'Successfully copied!' : 'Click to copy'"
        ><template #left> <component :is="currentIcon" /> </template
      ></UiButton>
      <UiButton
        :variant="ButtonVariant.Tertiary"
        :size="ButtonSize.Small"
        :onlyIcon="true"
        class="ui-btn"
        :class="{ 'disabled-retry': !canRetry }"
        @click="handleRetry"
        :disabled="!canRetry"
        :title="retryButtonTitle"
        ><template #left> <RetryIcon /> </template
      ></UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import Avatar from '@/shared/assets/icons/Avatar.png'
import AssistantAvatar from '@/shared/assets/icons/AssistantAvatar.png'
import { formatTime } from '@/shared/lib'
import { computed, ref } from 'vue'
import ChatAttachmentList from './ChatAttachmentList.vue'
import type { Attachment } from '@/entities/attachment/types'
import { UiButton, ButtonSize, ButtonVariant } from '@/shared/ui'
import RetryIcon from '@/shared/assets/icons/RetryIcon.svg'
import CopyIcon from '@/shared/assets/icons/CopyIcon.svg'
import SuccesIcon from '@/shared/assets/icons/SuccesIcon.svg'

const emit = defineEmits<{
  retry: [messageId: string]
}>()

const mProps = defineProps<{
  role: 'user' | 'assistant'
  content: string
  createdAt: number
  attachments?: Attachment[]
  hasAttachments?: boolean
  id: string
  canRetry?: boolean
}>()

const timeStr = computed(() => formatTime(mProps.createdAt))
const currentIcon = computed(() => (isCopied.value ? SuccesIcon : CopyIcon))
const isCopied = ref(false)
const canRetry = computed(() => !mProps.hasAttachments)

const canRetryComputed = computed(() => {
  if (mProps.canRetry !== undefined) {
    return mProps.canRetry
  }
  return mProps.role === 'assistant'
})

const retryButtonTitle = computed(() =>
  !canRetryComputed.value ? 'Cannot retry messages with attachments' : 'Click to retry'
)

const handleRetry = () => {
  if (canRetryComputed.value) {
    emit('retry', mProps.id)
  }
}

const copyingContent = async (content: string): Promise<void> => {
  if (!navigator.clipboard) {
    console.error('Clipboard API not supported')
    return
  }

  try {
    await navigator.clipboard.writeText(content)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (e) {
    console.error('Failed to copy: ', e)
  }
}
</script>

<style scoped>
.message-container {
  background: var(--neutral-100);
  max-width: 574px;
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.message-header {
  display: flex;
  flex-direction: row;
}

.message-actions {
  margin-top: 5px;
}

.attachment {
  margin-top: 15px;
}

.ui-btn {
  background: none;
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

.disabled-retry {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
