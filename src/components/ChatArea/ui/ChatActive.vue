<template>
  <div class="active-chat-container">
    <!-- Возможно тут лучше реализовать дату первого сообщения -->
    <!-- Но я не понял как мне вытащить что-то из v-for и преобразовать перед отправкой -->
    <!-- <p class="creation-date d-1 regular">Today 2:45 PM</p> -->

    <div class="dialog-container">
      <div class="messages">
        <!-- Для сравнения сообщений с разными ролями
        <ChatMessageItem
          class="message-item"
          role="user"
          content="Hello world"
          :createdAt="33333333333"
        /> -->

        <ChatMessageItem
          class="message-item"
          v-for="(message, idx) in data"
          :key="message.id"
          role="assistant"
          :content="message.content"
          :createdAt="message.createdAt"
          :isFirst="idx === 0"
        />
      </div>

      <div class="input-wrapper">
        <ChatInput variant="expanded" @send="handleSend" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatInput from './ChatInput.vue'
import { ref } from 'vue'
import ChatMessageItem from './ChatMessageItem.vue'

const data = ref<Message[]>([])

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
.active-chat-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

.dialog-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  padding: 0 20px 20px;
}

.messages {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 16px 0;
}

.input-wrapper {
  flex-shrink: 0;
}

.message-item {
  margin-bottom: 20px;
}

/* Оставлю на случай, если придётся переносить дату первого месседжа сюда */
/* .creation-date {
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  padding: 8px;
  position: relative;
  color: var(--neutral-600);
}
.creation-date::before,
.creation-date::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid var(--neutral-300);
  margin: auto 12px;
  max-width: 228px;
} */
</style>
