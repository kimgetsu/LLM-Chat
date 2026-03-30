<template>
  <div class="input-container">
    <ChatAttachmentList
      v-if="props.variant === 'expanded'"
      :attachments="attachments"
      :readonly="false"
      @remove="removeAttachment"
    />

    <div v-if="hasErrorAttachments" class="error-message">
      Some files failed to convert. Please remove them and try again.
    </div>

    <form :class="['input-section', props.variant]" @submit.prevent="handleSubmit">
      <textarea
        v-model="message"
        placeholder="How can I help you?"
        @keydown="handleKeyDown"
      ></textarea>
      <span class="input-btn">
        <UiButton
          v-if="props.variant === 'expanded'"
          :size="ButtonSize.Small"
          :variant="ButtonVariant.Tertiary"
          :onlyIcon="true"
          class="clip-btn"
          @click="openFilePicker"
        >
          <template #left> <ClipIcon /> </template>
        </UiButton>

        <UiButton
          :variant="ButtonVariant.Primary"
          :size="ButtonSize.Default"
          :onlyIcon="props.variant === 'compact'"
          :type="ButtonType.Submit"
          :disabled="isSendDisabled"
        >
          <template #left>
            <LoadingIcon v-if="isLoading" class="loading-icon" />
            <SendIcon />
          </template>

          <template v-if="props.variant === 'expanded'" #default>
            {{ isLoading ? 'Sending...' : 'Send message' }}
          </template>
        </UiButton>
      </span>

      <input
        ref="fileInput"
        type="file"
        multiple
        accept="audio/*,video/*,image/*,application/pdf"
        class="hidden"
        @change="handleFileSelect"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import { UiButton, ButtonVariant, ButtonSize, ButtonType } from '@/shared/ui'
import SendIcon from '@/shared/assets/icons//SendIcon.svg'
import { computed, ref } from 'vue'
import ChatAttachmentList from './ChatAttachmentList.vue'
import ClipIcon from '@/shared/assets/icons/ClipIcon.svg'
import LoadingIcon from '@/shared/assets/icons/LoadingIcon.svg'
import { useChatFiles } from '../model/useChatFiles'
import type { Attachment } from '@/entities/attachment/types'
import { useChatStore } from '../model/chatStore'

const props = defineProps<{
  variant: 'compact' | 'expanded'
  chatId?: string
}>()

const emit = defineEmits<{
  (e: 'send', text: string, attachments: Attachment[]): void
}>()

const { attachments, addFiles, clearAttachments, removeAttachment } = useChatFiles()
const store = useChatStore()
const message = ref('')
const fileInput = ref<HTMLInputElement | null>(null)

const isLoading = computed(() => {
  if (!props.chatId) return false
  return store.loadingByChatId[props.chatId] === true
})
const allAttachmentsReady = computed(() => attachments.value.every(a => a.status === 'ready'))
const hasErrorAttachments = computed(() => attachments.value.some(a => a.status === 'error'))
const isSendDisabled = computed(() => {
  const hasContent = message.value.trim() !== '' || attachments.value.length > 0
  return isLoading.value || !allAttachmentsReady.value || !hasContent
})

const openFilePicker = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  const files = Array.from(input.files || [])
  if (files.length > 0) {
    addFiles(files)
  }
  input.value = ''
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSubmit()
  }
}

const handleSubmit = () => {
  if (isSendDisabled.value) return
  emit('send', message.value, attachments.value)
  message.value = ''
}

defineExpose({ clearAttachments })
</script>

<style scoped>
.input-container {
  max-width: 574px;
}

.compact {
  width: 400px;
  height: 58px;
  background: linear-gradient(to right, #f0f4ff, #e6f0ff);
}

.compact .input-btn {
  margin: 5px;
}

.expanded {
  width: 574px;
  height: var(--expanded-height);
  background: var(--neutral-100);
  box-shadow: var(--sh-neutral-regular);
  flex-direction: column;
}

.expanded .input-btn {
  width: 100%;
  border-top: 1px solid var(--neutral-300);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px 12px 0;
  margin-inline: 5px;
}

.input-section {
  display: flex;
  align-items: flex-start;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--neutral-400);
}

.input-section textarea {
  flex: 1;
  padding: 12px 16px;
  border: none;
  background: transparent;
  outline: none;
  color: var(--neutral-700);
  resize: none;
  width: 100%;
}

.input-section textarea::placeholder {
  color: var(--neutral-600);
  font-family:
    Inter,
    -apple-system,
    sans-serif;
  font-size: 16px;
  line-height: 150%;
}

.clip-btn {
  background: var(--neutral-100);
}

.hidden {
  display: none;
}

.error-message {
  color: #dc2626;
  font-size: 12px;
  margin-bottom: 8px;
  padding-left: 4px;
}

.loading-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
