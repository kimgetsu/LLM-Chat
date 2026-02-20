<template>
  <form :class="['input-section', variant]" @submit.prevent="handleSubmit">
    <textarea v-model="message" placeholder="How can I help you?"></textarea>
    <span class="input-btn">
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
  </form>
</template>

<script setup lang="ts">
import { ButtonVariant, ButtonSize, ButtonType } from '@/components/shared/button.types'
import UiButton from '@/components/shared/UiButton.vue'
import SendIcon from '@/assets/icons/SendIcon.svg'
import { ref } from 'vue'

const message = ref('')

defineProps<{
  variant: 'compact' | 'expanded'
}>()

const emit = defineEmits<{
  (e: 'send', value: string): void
}>()

const handleSubmit = () => {
  if (!message.value.trim()) return

  emit('send', message.value)
  message.value = ''
}
</script>

<style scoped>
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
  height: 172px;
  background: var(--neutral-100);
  box-shadow: var(--sh-neutral-regular);
  flex-direction: column;
}

.expanded .input-btn {
  width: 100%;
  border-top: 1px solid var(--neutral-300);
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 12px 16px 12px 0;
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
</style>
