<template>
  <p v-if="isMessagesLoading" class="loading-message"><TypingLoader /></p>
  <p v-else-if="messagesError" class="error-message">⚠ {{ messagesError.message }}</p>

  <template v-else>
    <ChatDivider v-if="firstMessageDate" :date="firstMessageDate" />

    <div class="messages" ref="messagesContainer">
      <div ref="loadMoreTriggerRef" class="load-more-trigger"></div>

      <div v-for="message in sortedMessages" :key="message.id" class="message-item">
        <ChatMessageItem
          :role="message.role"
          :content="message.content"
          :createdAt="message.createdAt"
          :attachments="message.attachments"
          :id="message.id"
          :canRetry="chatStore.canRetryMessage(message)"
          @retry="handleRetryMessage"
        />
      </div>

      <p v-if="isSending" class="loading-message"><TypingLoader /></p>
      <p v-if="sendError" class="error-message">⚠ {{ sendError }}</p>
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
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useChatStore } from '@/features/chat/model/chatStore'
import { useChatMessagesQuery } from '@/features/chat/api/useChatMessagesQuery'
import { useInfiniteScroll } from '@/shared/composables'
import { useQueryClient } from '@tanstack/vue-query'
import type { Attachment } from '@/entities/attachment/types'
import type { Message } from '@/features/chat/model/types'
import ChatInput from './ChatInput.vue'
import ChatMessageItem from './ChatMessageItem.vue'
import ChatDivider from './ChatDivider.vue'
import { TypingLoader } from '@/shared/ui'

const route = useRoute()
const chatStore = useChatStore()
const queryClient = useQueryClient()

const currentChatId = computed(() => route.params.chatId as string)

const {
  data,
  fetchNextPage,
  isFetchingNextPage,
  isLoading: isMessagesLoading,
  error: messagesError,
} = useChatMessagesQuery(currentChatId)

const sortedMessages = computed(() => {
  const all = data.value?.pages.flatMap(p => p.newMessages) ?? []
  return [...all].sort((a: Message, b: Message) => a.createdAt - b.createdAt)
})

const firstMessageDate = computed(() => sortedMessages.value[0]?.createdAt)

const isSending = computed(() => chatStore.loadingByChatId[currentChatId.value])
const sendError = computed(() => chatStore.errorByChatId[currentChatId.value])

const messagesContainer = useTemplateRef<HTMLDivElement>('messagesContainer')
const loadMoreTriggerRef = ref<HTMLElement | null>(null)

const { reset: resetScrollObserver } = useInfiniteScroll({
  targetRef: loadMoreTriggerRef,
  rootRef: messagesContainer,
  onIntersect: () => {
    if (!isFetchingNextPage.value) {
      void fetchNextPage()
    }
  },
})

watch(
  () => sortedMessages.value.length,
  () => {
    nextTick(() => resetScrollObserver())
  },
  { flush: 'post' }
)

const scrollToNewMessage = () => {
  const container = messagesContainer.value
  if (container) {
    container.scrollTop = container.scrollHeight
  }
}

const chatInputRef = ref()

const handleSend = async (text: string, attachments: Attachment[]) => {
  const chatId = currentChatId.value

  await chatStore.sendMessage(chatId, text, attachments)

  if (!chatStore.errorByChatId[chatId]) {
    chatInputRef.value?.clearAttachments()
    await queryClient.invalidateQueries({ queryKey: ['chat', chatId, 'messages'] })
    nextTick(() => scrollToNewMessage())
  }
}

const handleRetryMessage = (messageId: string) => {
  const message = sortedMessages.value.find(m => m.id === messageId)
  if (!message) return
  chatStore.retryMessage(message)
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
