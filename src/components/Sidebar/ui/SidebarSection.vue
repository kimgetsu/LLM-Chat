<template>
  <aside :class="['sidebar', { collapsed: isCollapsed }]">
    <div class="sidebar-container">
      <header class="sidebar-header">
        <div class="header-content">
          <img src="../../../assets/icons/Avatar.png" alt="Avatar" class="avatar" />
          <p v-if="!isCollapsed" class="d-2 medium username">Denis Kim</p>
        </div>
        <div class="header-actions" :class="{ collapsed: isCollapsed }">
          <UiButton variant="tertiary" size="small" :onlyIcon="true">
            <template #left> <SettingsIcon /> </template>
          </UiButton>
          <UiButton @click="toggle" variant="tertiary" size="small" :onlyIcon="true">
            <template #left> <SidebarIcon /> </template>
          </UiButton>
        </div>
      </header>

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

      <footer v-if="!isCollapsed" class="sidebar-footer">
        <div class="btn-container">
          <UiButton variant="primary" size="default" class="sidebar-btn">
            <template #left><PlusIcon /></template>
            <template #default>Start new chat</template>
          </UiButton>
        </div>
      </footer>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useSidebarState } from '../model/useSidebarState'
import SettingsIcon from '../../../assets/icons/SettingsIcon.svg'
import SidebarIcon from '../../../assets/icons/SidebarIcon.svg'
import PlusIcon from '../../../assets/icons/PlusIcon.svg'
import UiButton from '../../shared/UiButton.vue'

const { isCollapsed, toggle } = useSidebarState()
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

.sidebar-btn {
  width: 248px;
  height: 45px;
}

.btn-container {
  display: flex;
  justify-content: center;
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

.sidebar.collapsed .username,
.sidebar.collapsed .chat-history,
.sidebar.collapsed .sidebar-footer {
  display: none;
}

.sidebar-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  height: 100%;
  box-sizing: border-box;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  width: 100%;
  transition: all 0.3s ease;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  background: var(--neutral-400);
  flex-shrink: 0;
}

.username {
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}

.header-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.header-actions.collapsed {
  flex-direction: column;
  gap: 32px;
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

.sidebar-footer {
  margin-top: auto;
  padding-top: 20px;
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
    width: 60px;
    min-width: 60px;
    z-index: 100;
    transform: translateX(0);
    transition: width 0.3s ease-in-out;
  }

  .sidebar:not(.collapsed) {
    width: 280px;
    min-width: 280px;
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
