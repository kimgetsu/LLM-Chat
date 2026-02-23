<template>
  <ChatDivider v-if="firstMessageDate" :date="firstMessageDate" />

  <div class="messages">
    <div v-for="message in data" :key="message.id" class="message-item">
      <ChatMessageItem role="assistant" :content="message.content" :createdAt="message.createdAt" />
    </div>
  </div>

  <div class="input-wrapper">
    <ChatInput variant="expanded" @send="handleSend" />
  </div>
</template>

<script setup lang="ts">
import ChatInput from './ChatInput.vue'
import { ref, computed } from 'vue'
import ChatMessageItem from './ChatMessageItem.vue'
import ChatDivider from './ChatDivider.vue'

const data = ref<Message[]>([])
const firstMessageDate = computed(() => data.value[0]?.createdAt)

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  createdAt: number
}

const handleSend = (text: string) => {
  data.value.push({
    id: Date.now(),
    role: 'assistant',
    content: text,
    createdAt: Date.now(),
  })
}
</script>

<style scoped>
.messages {
  width: 100%;
  max-width: 564px;
  margin: 0 auto;
}

.input-wrapper {
  flex-shrink: 0;
  position: absolute;
  bottom: 0;
  left: 50;
  width: 100;
  margin-bottom: 10px;
}

.message-item {
  margin-bottom: 20px;
}
</style>
