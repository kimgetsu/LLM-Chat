<template>
  <router-view />
</template>

<script setup lang="ts">
import { handleAuthCallback } from '@/shared/services'
import { useAuthStore } from '@/shared/stores/authStore'
import { onMounted } from 'vue'

const { loadFromStorage } = useAuthStore()

onMounted(() => {
  loadFromStorage()
  handleAuthCallback()
})
</script>
