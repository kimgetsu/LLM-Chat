<template>
  <header class="chat-header">
    <UiButton
      v-if="isMobile"
      :size="ButtonSize.Default"
      :variant="ButtonVariant.Tertiary"
      :onlyIcon="true"
      @click="toggle"
      class="sidebar-header-btn"
    >
      <template #left> <SidebarIcon /> </template>
    </UiButton>

    <h1 class="d-3 medium">Chats</h1>

    <UiButton
      :variant="ButtonVariant.Primary"
      :size="isMobile ? ButtonSize.Small : ButtonSize.Default"
      :onlyIcon="isMobile"
    >
      <template #left> <PlusIcon /> </template>
      <template #default v-if="!isMobile">New chat</template>
    </UiButton>
  </header>
</template>

<script setup lang="ts">
import PlusIcon from '@/assets/icons/PlusIcon.svg'
import SidebarIcon from '@/assets/icons/SidebarIcon.svg'
import UiButton from '@/components/shared/UiButton.vue'
import { useSidebarState } from '@/components/Sidebar'
import { ButtonVariant, ButtonSize } from '@/components/shared/button.types'
import { useAppBreakpoints } from '@/composables/useAppBreakpoints'

const { toggle } = useSidebarState()
const { isMobile } = useAppBreakpoints()
</script>

<style scoped>
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid var(--neutral-400);
  margin: -10px -20px 20px -20px;
  background: var(--neutral-100);
}

.sidebar-header-btn {
  background: var(--neutral-100);
}

@media (max-width: 1023px) {
  .chat-header {
    padding: 12px 20px;
    margin: -15px -20px 15px -20px;
  }
}

@media (max-width: 767px) {
  .chat-header {
    padding: 10px 15px;
    margin: -15px -15px 15px -15px;
  }
}

@media (max-width: 359px) {
  .chat-header {
    padding: 8px 12px;
    margin: 0 -12px 12px -12px;
  }
}
</style>
