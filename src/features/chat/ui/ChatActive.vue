<template>
  <ChatDivider v-if="firstMessageDate" :date="firstMessageDate" />

  <div class="messages" ref="messagesContainer">
    <div v-for="message in currentMessages" :key="message.id" class="message-item">
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
    <ChatInput variant="expanded" @send="handleSend" :key="currentChatId" />
  </div>
</template>

<script setup lang="ts">
import ChatInput from './ChatInput.vue'
import { computed, useTemplateRef, watch } from 'vue'
import ChatMessageItem from './ChatMessageItem.vue'
import ChatDivider from './ChatDivider.vue'
import { useSendMessage } from '../model/useSendMessage'
import TypingLoader from '@/shared/ui/loader/TypingLoader.vue'
import { useChatStore } from '@/features/chat/model/chatStore'
import { useRoute, useRouter } from 'vue-router'
import { RouteNames } from '@/app/router'

const route = useRoute()
const router = useRouter()
const chatStore = useChatStore()

const { sendMessage, isLoading, error } = useSendMessage()
const messagesContainer = useTemplateRef<HTMLDivElement>('messagesContainer')
const firstMessageDate = computed(() => currentMessages.value[0]?.createdAt)

const currentChatId = computed(() => {
  return route.params.chatId as string
})

const currentMessages = computed(() => {
  return chatStore.messagesByChatId[currentChatId.value] || []
})

const scrollToNewMessage = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

watch(() => currentMessages.value.length, scrollToNewMessage, { flush: 'post' })

const handleSend = async (text: string) => {
  let chatId = currentChatId.value

  if (!chatId) {
    chatId = chatStore.createChat()
    router.push({ name: RouteNames.ChatPage, params: { chatId: chatId } })
  }

  chatStore.addMessage(chatId, 'user', text)

  const assistantResponse = await sendMessage(
    currentMessages.value.map(m => ({
      role: m.role,
      content: m.content,
    }))
  )

  chatStore.addMessage(chatId, 'assistant', assistantResponse)
}

watch(
  () => route.query.initialMessage,
  initial => {
    if (initial && typeof initial === 'string') {
      router.replace({ query: {} })
      handleSend(initial)
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.messages {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  height: 100%;
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
  max-width: 564px;
  width: 100%;
}

.error-message {
  color: var(--primary-200);
}
</style>
