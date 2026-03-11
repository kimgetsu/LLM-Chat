<template>
  <section v-if="!isCollapsed" class="chat-history">
    <h2 class="d-1 medium history-title">CHAT HISTORY</h2>
    <ul class="chat-list">
      <li v-for="chat in chats" :key="chat.id" class="chat-item">
        <router-link :to="`/chat/${chat.id}`" class="chat-link">
          <span class="d-2 regular chat-title">{{ chat.title }}</span>
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { useSidebarState } from '@/components/Sidebar/model/useSidebarState'
import { useChatStore } from '@/stores/chatStore'

const { isCollapsed } = useSidebarState()
const chatStore = useChatStore()
const chats = chatStore.chats
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

.chat-link:hover {
  background: var(--neutral-400);
}

.chat-title {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
