<template>
  <div class="welcome-card glow-bg">
    <!-- glow-bg -->
    <div class="welcome-content">
      <div class="text-section">
        <h2 class="d-5 medium">Welcome back, Denis</h2>
        <p class="p-default regular">Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
      </div>

      <ChatInput variant="compact" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatInput from './ChatInput.vue'
</script>

<style scoped>
.welcome-card {
  position: relative;
  background-color: var(--neutral-100);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 12px;
  padding: 30px;
  box-shadow: var(--sh-neutral-regular);
  margin: 0 auto;
  min-width: 300px;
  max-width: 774px;
  width: 100%;
  height: 234px;
  border: 1px solid var(--neutral-400);
  display: flex;
  align-items: center;
  justify-content: center;
}

.welcome-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 32px;
}

.text-section {
  width: 400px;
  text-align: center;
}

.text-section p {
  color: var(--neutral-600);
}

@media (max-width: 1023px) {
  .welcome-card {
    max-width: 600px;
    padding: 25px;
    height: auto;
    min-height: 200px;
  }

  .welcome-content {
    gap: 28px;
  }

  .text-section {
    width: 350px;
  }

  .input-section {
    width: 350px;
    height: 52px;
  }
}

@media (max-width: 767px) {
  .welcome-card {
    max-width: 100%;
    padding: 20px;
    min-height: 180px;
  }

  .welcome-content {
    gap: 24px;
  }

  .text-section {
    width: 100%;
    max-width: 400px;
  }

  .input-section {
    width: 100%;
    max-width: 400px;
    height: 50px;
    border-radius: 6px;
  }

  .input-section input {
    padding: 10px 12px;
  }
}

@media (max-width: 359px) {
  .welcome-card {
    padding: 16px;
    min-height: 160px;
  }

  .welcome-content {
    gap: 20px;
  }

  .input-section {
    height: 46px;
  }

  .input-section input {
    padding: 8px 10px;
  }
}
</style>
