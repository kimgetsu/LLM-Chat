<template>
  <section v-if="!isCollapsed" class="chat-history" ref="chatListRef">
    <h2 class="d-1 medium history-title">CHAT HISTORY</h2>
    <ul class="chat-list">
      <li v-for="chat in chats" :key="chat.id" class="chat-item" @click="closeSidebarOnMobile">
        <router-link
          :to="{ name: RouteNames.ChatPage, params: { chatId: chat.id } }"
          :class="['chat-link', { 'selected-chat': route.params.chatId === chat.id }]"
        >
          <span class="d-2 regular chat-title">{{ chat.title }}</span>
        </router-link>
      </li>

      <li v-if="isFetchingNextPage" class="chat-item loading-indicator">
        <span class="d-2 regular">Loading...</span>
      </li>

      <li ref="loadMoreTriggerRef" class="load-more-trigger"></li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, computed } from 'vue'
import { useSidebarState } from '@/features/sidebar'
import { useRoute } from 'vue-router'
import { useAppBreakpoints, useInfiniteScroll } from '@/shared/composables'
import { RouteNames } from '@/app/router'
import { useChatsQuery } from '@/features/chat/api/useChatsQuery'

const { isCollapsed, close } = useSidebarState()
const { isMobile } = useAppBreakpoints()
const route = useRoute()

const { data, fetchNextPage, isFetchingNextPage } = useChatsQuery()

const chats = computed(() => data.value?.pages.flatMap(p => p.transformedChats) ?? [])

const chatListRef = ref<HTMLElement | null>(null)
const loadMoreTriggerRef = ref<HTMLElement | null>(null)

const { reset } = useInfiniteScroll({
  targetRef: loadMoreTriggerRef,
  rootRef: chatListRef,
  onIntersect: () => void fetchNextPage(),
})

watch(
  () => chats.value.length,
  (newLength, oldLength) => {
    nextTick(() => reset())

    if (newLength > oldLength && chatListRef.value) {
      chatListRef.value.scrollTop = 0
    }
  }
)

const closeSidebarOnMobile = () => {
  if (isMobile.value) {
    close()
  }
}
</script>

<style scoped>
.chat-history {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
}

.history-title {
  text-transform: uppercase;
  margin: 0 0 16px 0;
  letter-spacing: 0.5px;
  color: var(--neutral-500);
}

.chat-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.chat-item {
  border-radius: 8px;
  overflow: hidden;
}

.chat-link {
  display: block;
  padding: 14px 12px;
  text-decoration: none;
  color: var(--neutral-600);
  border-radius: 8px;
  transition: all 0.2s ease;
  background: transparent;
}

.chat-link:hover:not(.selected-chat) {
  background: var(--neutral-300);
  opacity: 0.9;
}

.chat-title {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.selected-chat {
  background: var(--neutral-400);
}

.load-more-trigger {
  height: 1px;
  visibility: hidden;
}

.loading-indicator {
  text-align: center;
  padding: 12px;
  opacity: 0.7;
}
</style>
