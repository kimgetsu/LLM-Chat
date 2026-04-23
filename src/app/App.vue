<template>
  <router-view />
</template>

<script setup lang="ts">
import { globalAuthGuard } from './router/guards'
import { useChatStore } from '@/features/chat/model/chatStore'

const chatStore = useChatStore()

globalAuthGuard()
chatStore.initializeChats()
</script>
