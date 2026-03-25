<template>
  <div class="input-container">
    <ChatAttachmentList />

    <form :class="['input-section', variant]" @submit.prevent="handleSubmit">
      <textarea
        v-model="message"
        placeholder="How can I help you?"
        @keydown="handleKeyDown"
      ></textarea>
      <span class="input-btn">
        <UiButton
          v-if="variant === 'expanded'"
          :size="ButtonSize.Small"
          :variant="ButtonVariant.Tertiary"
          :onlyIcon="true"
          class="clip-btn"
          @click="openFilePicker"
        >
          <template #left> <ClipIcon /> </template>
        </UiButton>

        <!-- <input
        ref="fileInput"
        type="file"
        multiple
        accept="audio/*,video/*,application/pdf"
        class="hidden"
        @change="handleFileSelect"
      /> -->

        <UiButton
          :variant="ButtonVariant.Primary"
          :size="ButtonSize.Default"
          :onlyIcon="variant === 'compact'"
          :type="ButtonType.Submit"
        >
          <template #left>
            <SendIcon />
          </template>

          <template v-if="variant === 'expanded'" #default> Send message </template>
        </UiButton>
      </span>
      <input
        ref="fileInput"
        type="file"
        multiple
        accept="audio/*,video/*,application/pdf"
        class="hidden"
        @change="handleFileSelect"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import { UiButton, ButtonVariant, ButtonSize, ButtonType } from '@/shared/ui'
import SendIcon from '@/shared/assets/icons//SendIcon.svg'
import { ref } from 'vue'
import ChatAttachmentList from './ChatAttachmentList.vue'
import ClipIcon from '@/shared/assets/icons/ClipIcon.svg'
import { useChatFiles } from '../model/useChatFiles'

const { attachments, addFiles, clearAttachments } = useChatFiles()

const message = ref('')
const fileInput = ref<HTMLInputElement | null>(null)

defineProps<{
  variant: 'compact' | 'expanded'
}>()

const emit = defineEmits<{
  (e: 'send', value: string): void
}>()

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
  if (!message.value.trim() && attachments.value.length === 0) return
  emit('send', message.value)
  message.value = ''
  clearAttachments()
}
</script>

<style scoped>
.input-container {
  width: 574px;
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
  width: 100%;
  max-width: 574px;
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
</style>
