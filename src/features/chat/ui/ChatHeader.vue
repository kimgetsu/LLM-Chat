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

    <h1 class="d-3 medium">{{ chatTitle }}</h1>

    <UiButton
      :variant="ButtonVariant.Primary"
      :size="isMobile ? ButtonSize.Small : ButtonSize.Default"
      :onlyIcon="isMobile"
      @click="handleNewChat"
    >
      <template #left> <PlusIcon /> </template>
      <template #default v-if="!isMobile">New chat</template>
    </UiButton>
  </header>
</template>

<script setup lang="ts">
import PlusIcon from '@/assets/icons/PlusIcon.svg'
import SidebarIcon from '@/assets/icons/SidebarIcon.svg'
import UiButton from '@/shared/ui/button/UiButton.vue'
import { useSidebarState } from '@/features/sidebar'
import { ButtonVariant, ButtonSize } from '@/shared/ui/button/button.types'
import { useAppBreakpoints } from '@/shared/composables/useAppBreakpoints'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useChatStore } from '@/features/chat/model/chatStore'
import { RouteNames } from '@/app/router'

const { toggle } = useSidebarState()
const { isMobile } = useAppBreakpoints()
const route = useRoute()
const router = useRouter()
const chatStore = useChatStore()

const chatTitle = computed(() => {
  const chatId = route.params.chatId

  if (!chatId) {
    return 'Chats'
  }

  return chatStore.chats.find(c => c.id === chatId)?.title
})

const handleNewChat = () => {
  router.push({ name: RouteNames.HomePage })
}
</script>

<style scoped>
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid var(--neutral-400);
  margin-top: -10px;
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
