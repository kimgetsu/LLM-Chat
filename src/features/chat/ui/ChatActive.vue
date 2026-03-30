<template>
  <ChatDivider v-if="firstMessageDate" :date="firstMessageDate" />

  <div class="messages" ref="messagesContainer">
    <div v-for="message in currentMessages" :key="message.id" class="message-item">
      <ChatMessageItem
        :role="message.role"
        :content="message.content"
        :createdAt="message.createdAt"
        :attachments="message.attachments"
      />
    </div>
    <p v-if="isLoading" class="loading-message"><TypingLoader /></p>
    <p v-if="error" class="error-message">⚠ {{ error }}</p>
  </div>

  <div class="input-wrapper">
    <ChatInput
      ref="chatInputRef"
      variant="expanded"
      @send="handleSend"
      :key="currentChatId"
      :chatId="currentChatId"
    />
  </div>
</template>

<script setup lang="ts">
import ChatInput from './ChatInput.vue'
import { computed, ref, useTemplateRef, watch } from 'vue'
import ChatMessageItem from './ChatMessageItem.vue'
import ChatDivider from './ChatDivider.vue'
import { TypingLoader } from '@/shared/ui'
import { useChatStore } from '@/features/chat/model/chatStore'
import { useRoute, useRouter } from 'vue-router'
import { RouteNames } from '@/app/router'
import type { Attachment } from '@/entities/attachment/types'

const route = useRoute()
const router = useRouter()
const chatStore = useChatStore()
const messagesContainer = useTemplateRef<HTMLDivElement>('messagesContainer')
const firstMessageDate = computed(() => currentMessages.value[0]?.createdAt)

const chatInputRef = ref()

const isLoading = computed(() => {
  return chatStore.loadingByChatId[currentChatId.value]
})

const error = computed(() => {
  return chatStore.errorByChatId[currentChatId.value]
})

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

const handleSend = async (text: string, attachments: Attachment[]) => {
  let chatId = currentChatId.value

  if (!chatId) {
    chatId = chatStore.createChat()
    await router.push({ name: RouteNames.ChatPage, params: { chatId } })
  }

  await chatStore.sendMessage(chatId, text, attachments)

  if (!chatStore.errorByChatId[chatId]) {
    chatInputRef.value?.clearAttachments()
  }
}
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
