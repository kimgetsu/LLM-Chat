<template>
  <div class="auth-callback">
    <p class="p-default">Processing login..</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/shared/stores/authStore'
import { router, RouteNames } from '@/app/router'
// import { useAuthCallback } from '../model/useAuthCallback'

const authStore = useAuthStore()

onMounted(async () => {
  try {
    await authStore.fetchMe()
  } finally {
    router.replace({ name: RouteNames.HomePage })
  }
})
</script>

<style scoped>
.auth-callback {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
