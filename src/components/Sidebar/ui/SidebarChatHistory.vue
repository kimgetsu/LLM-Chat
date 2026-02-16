<template>
  <section v-if="!isCollapsed" class="chat-history">
    <h2 class="d-1 medium history-title">CHAT HISTORY</h2>
    <ul class="chat-list">
      <li class="chat-item">
        <a href="#" class="chat-link">
          <span class="d-2 regular chat-title">How to improve my English skills?</span>
        </a>
      </li>
      <li class="chat-item">
        <a href="#" class="chat-link">
          <span class="d-2 regular chat-title">Help me debug this JS code</span>
        </a>
      </li>
      <li class="chat-item">
        <a href="#" class="chat-link">
          <span class="d-2 regular chat-title"
            >Write a poem about the heat of her hair, the coals in a January fire and how I burn in
            it</span
          >
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { useSidebarState } from '@/components/Sidebar/model/useSidebarState'

const { isCollapsed } = useSidebarState()
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
