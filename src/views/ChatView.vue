<template>
  <div class="app-container">
    <Sidebar />
    <section class="content-area">
      <ChatArea />
    </section>

    <div v-if="isMobile && !isCollapsed" class="mobile-overlay" @click="closeSidebar"></div>
  </div>
</template>

<script setup lang="ts">
import ChatArea from '../components/ChatArea.vue'
import Sidebar from '../components/Sidebar/ui/Sidebar.vue'
import { useSidebarState } from '../components/Sidebar'

const { isMobile, isCollapsed, close } = useSidebarState()

const closeSidebar = () => {
  if (!isCollapsed.value) close()
}
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
  overflow: hidden;
}

.mobile-overlay {
  position: fixed;
  top: 0;
  left: 60px;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 90;
  backdrop-filter: blur(2px);
  animation: fadeIn 0.3s ease;
  pointer-events: auto;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 1023px) {
  .app-container:not(:has(.sidebar.collapsed)) {
    grid-template-columns: 240px 1fr;
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
</style>
