<template>
  <header class="sidebar-header">
    <div class="header-content">
      <img src="../../../assets/icons/Avatar.png" alt="Avatar" class="avatar" />
      <p v-if="!isCollapsed" class="d-2 medium username">Denis Kim</p>
    </div>
    <div class="header-actions" :class="{ collapsed: isCollapsed }">
      <UiButton :variant="ButtonVariant.Tertiary" :size="ButtonSize.Small" :onlyIcon="true">
        <template #left> <SettingsIcon /> </template>
      </UiButton>
      <UiButton
        @click="toggle"
        :variant="ButtonVariant.Tertiary"
        :size="ButtonSize.Small"
        :onlyIcon="true"
      >
        <template #left> <SidebarIcon /> </template>
      </UiButton>
    </div>
  </header>
</template>

<script setup lang="ts">
import UiButton from '@/components/shared/UiButton.vue'
import SettingsIcon from '@/assets/icons/SettingsIcon.svg'
import SidebarIcon from '@/assets/icons/SidebarIcon.svg'
import { useSidebarState } from '@/components/Sidebar/model/useSidebarState'
import { ButtonVariant, ButtonSize } from '@/components/shared/button.types'

const { isCollapsed, toggle } = useSidebarState()
</script>

<style scoped>
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

.sidebar.collapsed .sidebar-header {
  flex-direction: column;
  align-items: center;
  gap: 32px;
  margin-bottom: 0;
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
</style>
