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
    <p v-if="isLoading" class="loading-message"><TypingLoader /></p>
    <p v-if="error" class="error-message">⚠ {{ error }}</p>
  </div>

  <div class="input-wrapper">
    <ChatInput variant="expanded" @send="handleSend" />
  </div>
</template>

<script setup lang="ts">
import ChatInput from './ChatInput.vue'
import { ref, computed, useTemplateRef, watch } from 'vue'
import ChatMessageItem from './ChatMessageItem.vue'
import ChatDivider from './ChatDivider.vue'
import { v4 as uuidv4 } from 'uuid'
import { useSendMessage } from '../model/useSendMessage'
import TypingLoader from '@/components/shared/TypingLoader.vue'

const data = ref<Message[]>([])
const messagesContainer = useTemplateRef<HTMLDivElement>('messagesContainer')
const firstMessageDate = computed(() => data.value[0]?.createdAt)
const { sendMessage, isLoading, error } = useSendMessage()

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

watch(() => data.value.length, scrollToNewMessage, { flush: 'post' })

const handleSend = async (text: string) => {
  const userMessage: Message = {
    id: uuidv4(),
    role: 'user',
    content: text,
    createdAt: Date.now(),
  }
  data.value.push(userMessage)

  const assistantResponse = await sendMessage(data.value)

  const assistantMessage: Message = {
    id: uuidv4(),
    role: 'assistant',
    content: assistantResponse,
    createdAt: Date.now(),
  }

  data.value.push(assistantMessage)
}
</script>

<style scoped>
.messages {
  width: 100%;
  max-width: 564px;
  margin: 0 auto;
  overflow-y: auto;
  padding-bottom: var(--expanded-height);
}

.input-wrapper {
  position: absolute;
  bottom: 8px;
  left: 5px;
  right: 5px;
  display: flex;
  justify-content: center;
}

.message-item {
  margin-bottom: 20px;
}

.error-message {
  color: var(--primary-200);
}
</style>
