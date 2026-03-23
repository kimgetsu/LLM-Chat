<template>
  <div class="auth-callback">
    <p class="p-default">Processing login..</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthCallback } from '../model/useAuthCallback'

const { handleAuthCallback } = useAuthCallback()

onMounted(() => {
  handleAuthCallback()
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
