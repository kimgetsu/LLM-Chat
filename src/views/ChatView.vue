<template>
  <div class="app-container">
    <Sidebar />
    <section class="content-area">
      <ChatHeader />
      <div class="chat-main">
        <RouterView />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import ChatHeader from '@/components/ChatArea/ui/ChatHeader.vue'
import { Sidebar } from '@/components/Sidebar'
</script>

<style scoped>
.app-container {
  display: grid;
  grid-template-columns: 296px 1fr;
  background: #f7f8fa;
  height: 100vh;
  padding: 10px 10px 10px 0;
  box-sizing: border-box;
  transition: grid-template-columns 0.4s ease-in-out;
  position: relative;
  overflow: hidden;
}

.app-container:has(.sidebar.collapsed) {
  grid-template-columns: 60px 1fr;
}

.content-area {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  background: var(--neutral-100);
  padding: 20px 0;
  border-radius: 16px;
  border: 1px solid var(--neutral-400);
}

.chat-main {
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  overflow: auto;
  padding-bottom: var(--expanded-height);
  padding-top: 16px;
}

@media (max-width: 1023px) {
  .app-container:not(:has(.sidebar.collapsed)) {
    grid-template-columns: 240px 1fr;
  }

  .content-area {
    padding: 20px;
    border-radius: 14px;
  }
}

@media (max-width: 767px) {
  .app-container {
    display: flex;
    padding: 0;
    position: relative;
    overflow: hidden;
  }

  .content-area {
    flex: 1;
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    position: relative;
    box-sizing: border-box;
    padding: 15px;
    border-radius: 12px;
  }

  .content-area .chat-container {
    margin: 0;
    width: 100%;
    height: 100%;
    border-radius: 0;
    padding: 16px;
    min-height: 100vh;
    box-sizing: border-box;
    position: relative;
    z-index: 1;
  }
}

@media (max-width: 359px) {
  .content-area {
    padding: 12px;
  }
}
</style>
