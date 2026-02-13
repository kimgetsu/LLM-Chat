<template>
  <aside :class="['sidebar', { collapsed: isCollapsed }]">
    <div class="sidebar-container">
      <SidebarHeader />
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
                >Write a poem about the heat of her hair, the coals in a January fire and how I burn
                in it</span
              >
            </a>
          </li>
        </ul>
      </section>
      <SidebarFooter />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useSidebarState } from '../model/useSidebarState'
import SidebarHeader from './SidebarHeader.vue'
import SidebarFooter from './SidebarFooter.vue'

const { isCollapsed } = useSidebarState()
</script>

<style scoped>
.sidebar {
  width: 296px;
  min-width: 296px;
  background: var(--neutral-200);
  display: flex;
  flex-direction: column;
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

.sidebar.collapsed .sidebar-header {
  flex-direction: column;
  align-items: center;
  gap: 32px;
  margin-bottom: 0;
  padding: 24px 0;
}

.sidebar.collapsed .header-content {
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.sidebar.collapsed .header-actions {
  flex-direction: column;
  align-items: center;
  gap: 32px;
  margin-top: 20px;
}

.sidebar-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  height: 100%;
  box-sizing: border-box;
}

.icon {
  display: block;
}

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
