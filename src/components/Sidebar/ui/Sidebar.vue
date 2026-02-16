<template>
  <aside :class="['sidebar', { collapsed: isCollapsed }]">
    <SidebarHeader />
    <SidebarChatHistory />
    <SidebarFooter />
  </aside>

  <div v-if="isMobile && !isCollapsed" class="mobile-overlay" @click="closeSidebar"></div>
</template>

<script setup lang="ts">
import SidebarHeader from './SidebarHeader.vue'
import SidebarFooter from './SidebarFooter.vue'
import SidebarChatHistory from './SidebarChatHistory.vue'
import { useSidebarState } from '@/components/Sidebar/model/useSidebarState'
import { useAppBreakpoints } from '@/composables/useAppBreakpoints'
import { watch } from 'vue'

const { isCollapsed, close } = useSidebarState()
const { isMobile } = useAppBreakpoints()

watch(
  isMobile,
  val => {
    if (val) {
      isCollapsed.value = true
    }
  },
  { immediate: true }
)

const closeSidebar = () => {
  if (!isCollapsed.value) close()
}
</script>

<style scoped>
.sidebar {
  box-sizing: border-box;
  width: 296px;
  min-width: 296px;
  background: var(--neutral-200);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  height: 100%;
  transition:
    width 0.4s ease-in-out,
    transform 0.3s ease-in-out;
  position: relative;
  z-index: 100;
  overflow: hidden;
}

.sidebar.collapsed {
  width: 60px;
  min-width: 60px;
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
  .sidebar:not(.collapsed) {
    width: 240px;
    min-width: 240px;
  }

  .sidebar-container {
    padding: 20px;
  }

  .username {
    max-width: 120px;
  }

  .chat-link {
    padding: 12px 10px;
  }

  .sidebar.collapsed {
    width: 60px;
    min-width: 60px;
  }
}

@media (max-width: 767px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    min-width: 0;
    z-index: 100;
    transform: translateX(-100%);
    position: fixed;
    transition: width 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out;
  }

  .sidebar:not(.collapsed) {
    transform: translate(0);
    width: 280px;
    box-shadow: var(--sh-neutral-medium);
    z-index: 100;
  }

  .sidebar-container {
    padding: 20px 16px;
  }

  .sidebar-header {
    margin-bottom: 30px;
  }

  .username {
    max-width: 140px;
  }

  .chat-link {
    padding: 12px 10px;
  }
}
</style>
