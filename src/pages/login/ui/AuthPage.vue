<template>
  <div class="login-container glow-bg">
    <UiButton
      @click="handleAuth"
      :variant="ButtonVariant.Primary"
      :size="ButtonSize.Default"
      :type="ButtonType.Button"
      class="login-btn"
    >
      <template #default>Login</template>
    </UiButton>
  </div>
</template>

<script setup lang="ts">
import { ButtonSize, ButtonType, ButtonVariant, UiButton } from '@/shared/ui'

const handleAuth = () => {
  window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/start`
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-btn {
  max-width: 443px;
  width: 100%;
  margin: 25px;
}
</style>
