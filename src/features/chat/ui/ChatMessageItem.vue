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
        <div :class="[{ 'message-content': role === 'assistant' }]" v-html="renderedContent" />
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
import { marked } from 'marked'

const emit = defineEmits<{
  retry: [messageId: string]
}>()

const mProps = defineProps<{
  role: 'user' | 'assistant'
  content: string
  createdAt: number
  attachments?: Attachment[]
  id: string
  canRetry: boolean
}>()

const timeStr = computed(() => formatTime(mProps.createdAt))
const currentIcon = computed(() => (isCopied.value ? SuccesIcon : CopyIcon))
const isCopied = ref(false)
const canRetry = mProps.canRetry

const retryButtonTitle = computed(() =>
  !canRetry ? 'Cannot retry messages with attachments' : 'Click to retry'
)

const handleRetry = () => {
  if (canRetry) {
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

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>')
}

const renderedContent = computed(() => {
  if (mProps.role !== 'assistant') return escapeHtml(mProps.content)

  return marked.parse(mProps.content, {
    breaks: true,
    gfm: true,
  })
})
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

.message-content :deep(h1),
.message-content :deep(h2),
.message-content :deep(h3) {
  margin: 0.5em 0 0.25em;
}

.message-content :deep(p) {
  margin: 0.25em 0;
}

.message-content :deep(pre) {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 1em;
  border-radius: 8px;
  overflow-x: auto;
}

.message-content :deep(code) {
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
}

.message-content :deep(ul),
.message-content :deep(ol) {
  padding-left: 1.5em;
}

.message-content :deep(blockquote) {
  border-left: 3px solid var(--primary-200);
  padding-left: 1em;
  opacity: 0.8;
}
</style>
