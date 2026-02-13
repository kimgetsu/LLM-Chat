<template>
  <footer class="sidebar-footer">
    <div :class="['btn-container', { collapsed: isCollapsed }]">
      <UiButton
        variant="primary"
        :size="isCollapsed ? 'small' : 'default'"
        :onlyIcon="isCollapsed"
        class="sidebar-btn"
      >
        <template #left><PlusIcon /></template>
        <template #default v-if="!isCollapsed">Start new chat</template>
      </UiButton>
    </div>
  </footer>
</template>

<script setup lang="ts">
import UiButton from '../../shared/UiButton.vue'
import PlusIcon from '../../../assets/icons/PlusIcon.svg'
import { useSidebarState } from '../model/useSidebarState'

const { isCollapsed } = useSidebarState()
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
