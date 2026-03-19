<template>
  <footer class="sidebar-footer">
    <div :class="['btn-container', { collapsed: isCollapsed }]">
      <UiButton
        :variant="ButtonVariant.Primary"
        :size="isCollapsed ? ButtonSize.Small : ButtonSize.Default"
        :onlyIcon="isCollapsed"
        class="sidebar-btn"
        @click="handleNewChat"
      >
        <template #left><PlusIcon /></template>
        <template #default v-if="!isCollapsed">Start new chat</template>
      </UiButton>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { UiButton, ButtonVariant, ButtonSize } from '@/shared/ui'
import PlusIcon from '@/shared/assets/icons/PlusIcon.svg'
import { useSidebarState } from '@/features/sidebar'
import { useRouter } from 'vue-router'
import { RouteNames } from '@/app/router'

const router = useRouter()
const { isCollapsed } = useSidebarState()

const handleNewChat = () => {
  router.push({ name: RouteNames.HomePage })
}
</script>

<style scoped>
.sidebar-btn {
  width: 248px;
  height: 45px;
}

.btn-container {
  display: flex;
  justify-content: center;
}

.btn-container.collapsed {
  display: flex;
  justify-content: center;
}

.sidebar.collapsed .sidebar-btn {
  width: 32px;
  height: 32px;
  padding: 20px;
}

.sidebar-footer {
  margin-top: auto;
  padding-top: 20px;
}
</style>
