<template>
  <div class="app-container">
    <Sidebar />
    <div class="content-area">
      <ChatArea />
    </div>

    <div v-if="isMobile && !isSidebarCollapsed" class="mobile-overlay" @click="closeSidebar"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ChatArea from '../components/ChatArea.vue'
import Sidebar from '../components/Sidebar.vue'

const isMobile = ref(false)
const isSidebarCollapsed = ref(true)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
  if (isMobile.value) {
    isSidebarCollapsed.value = true
  }
}

const closeSidebar = () => {
  isSidebarCollapsed.value = true
  const sidebarBtn = document.querySelector('.sidebar .collapse-btn') as HTMLElement
  if (sidebarBtn) sidebarBtn.click()
}

let observer: MutationObserver | null = null

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)

  const sidebar = document.querySelector('.sidebar')
  if (sidebar) {
    const updateSidebarState = () => {
      isSidebarCollapsed.value = sidebar.classList.contains('collapsed')
    }

    observer = new MutationObserver(updateSidebarState)
    observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] })

    updateSidebarState()
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  if (observer) {
    observer.disconnect()
  }
})
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
    margin-left: 60px;
    transition: margin-left 0s;
    box-sizing: border-box;
  }

  .app-container:has(.sidebar:not(.collapsed)) .content-area {
    margin-left: 60px;
  }

  .app-container:has(.sidebar:not(.collapsed)) .content-area::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 89;
    pointer-events: none;
    animation: fadeIn 0.3s ease;
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
