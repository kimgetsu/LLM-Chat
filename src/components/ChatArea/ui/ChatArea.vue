<template>
  <div class="chat-container">
    <ChatHeader />

    <main class="chat-main">
      <ChatWelcomeCard v-if="test" />
      <ChatActive v-else />
    </main>
  </div>
</template>

<script setup lang="ts">
import ChatActive from './ChatActive.vue'
import ChatHeader from './ChatHeader.vue'
import ChatWelcomeCard from './ChatWelcomeCard.vue'

const test = false
</script>

<style scoped>
.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  background: var(--neutral-100);
  padding: 20px;
  border-radius: 16px;
  border: 1px solid var(--neutral-400);
}

.chat-main {
  flex: 1;
  min-height: 0;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

@media (max-width: 1023px) {
  .chat-container {
    padding: 20px;
    border-radius: 14px;
  }
}

@media (max-width: 767px) {
  .chat-container {
    padding: 15px;
    border-radius: 12px;
  }
}

@media (max-width: 359px) {
  .chat-container {
    padding: 12px;
  }
}
</style>
