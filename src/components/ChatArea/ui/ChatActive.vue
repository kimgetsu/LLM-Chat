<template>
  <ChatDivider v-if="firstMessageDate" :date="firstMessageDate" />

  <div class="messages" ref="messagesContainer">
    <div v-for="message in data" :key="message.id" class="message-item">
      <ChatMessageItem
        :role="message.role"
        :content="message.content"
        :createdAt="message.createdAt"
      />
    </div>
  </div>

  <div class="input-wrapper">
    <ChatInput variant="expanded" @send="handleSend" />
  </div>
</template>

<script setup lang="ts">
import ChatInput from './ChatInput.vue'
import { ref, computed, nextTick } from 'vue'
import ChatMessageItem from './ChatMessageItem.vue'
import ChatDivider from './ChatDivider.vue'
import { v4 as uuidv4 } from 'uuid'
import { openRouterApi } from '../api/openRouter.api'

const data = ref<Message[]>([])
const messagesContainer = ref<HTMLDivElement | null>(null)
const firstMessageDate = computed(() => data.value[0]?.createdAt)

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: number
}

const scrollToNewMessage = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const handleSend = async (text: string) => {
  const userMessage = {
    id: uuidv4(),
    role: 'user',
    content: text,
    createdAt: Date.now(),
  }

  data.value.push(userMessage)
  await nextTick()
  scrollToNewMessage()

  try {
    const messagesForApi = data.value.map(msg => ({
      role: msg.role,
      content: msg.content,
    }))

    const assistantResponse = await openRouterApi.sendMessage(messagesForApi)

    const assistantMessage = {
      id: uuidv4(),
      role: 'assistant',
      content: assistantResponse,
      createdAt: Date.now(),
    }
    data.value.push(assistantMessage)
  } catch (error) {
    console.error('Ошибка при обращении к OpenRouter:', error)
    // Позже можно добавить сообщение об ошибке
  } finally {
    await nextTick()
    scrollToNewMessage()
  }
}
</script>

<style scoped>
.messages {
  width: 100%;
  max-width: 564px;
  margin: 0 auto;

  overflow-y: auto;
}

.input-wrapper {
  flex-shrink: 0;
  position: absolute;
  bottom: 0;
  left: 50;
  margin-bottom: 10px;
}

.message-item {
  margin-bottom: 20px;
}
</style>
