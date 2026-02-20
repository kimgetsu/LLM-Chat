<template>
  <p v-if="isFirst" class="creation-date d-1 regular">{{ dateStr }} | {{ timeStr }}</p>

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
</template>

<script setup lang="ts">
import Avatar from '@/assets/icons/Avatar.png'
import AssistantAvatar from '@/assets/icons/AssistantAvatar.png'

const mProps = defineProps<{
  role: 'user' | 'assistant'
  content: string
  createdAt: number

  isFirst?: boolean
}>()

// Возможно имеет смысл вынести преобразование времени в родительский компонент
// или вообще в отдельный композабл. Но я не знаю как это реализовать

const createdTime = new Date(mProps.createdAt)

const timeStr = createdTime.toLocaleTimeString('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
})

const dateStr = createdTime
  .toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  })
  .toUpperCase()
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

.creation-date {
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  padding: 8px;
  position: relative;
  color: var(--neutral-600);
  margin-bottom: 20px;
}

.creation-date::before,
.creation-date::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid var(--neutral-300);
  margin: auto 12px;
  max-width: 228px;
}
</style>
