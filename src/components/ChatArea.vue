<template>
  <div class="chat-container">
    <header class="chat-header">
      <UiButton
        v-if="isMobile"
        size="default"
        variant="tertiary"
        :onlyIcon="true"
        @click="toggle"
        class="sidebar-header-btn"
      >
        <template #left> <SidebarIcon /> </template>
      </UiButton>

      <h1 class="d-3 medium">Chats</h1>

      <UiButton variant="primary" :size="isMobile ? 'small' : 'default'" :onlyIcon="isMobile">
        <template #left> <PlusIcon /> </template>
        <template #default v-if="!isMobile">New chat</template>
      </UiButton>
    </header>

    <main class="chat-main">
      <div class="welcome-card glow-bg">
        <div class="welcome-content">
          <div class="text-section">
            <h2 class="d-5 medium">Welcome back, Denis</h2>
            <p class="p-default regular">Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
          </div>
          <form class="input-section">
            <input type="text" placeholder="How can I help you?" />
            <span class="input-btn">
              <UiButton variant="primary" size="default" :onlyIcon="true">
                <template #left> <SendIcon /> </template>
              </UiButton>
            </span>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import PlusIcon from '../assets/icons/PlusIcon.svg'
import SendIcon from '../assets/icons/SendIcon.svg'
import UiButton from './shared/UiButton.vue'
import SidebarIcon from '../assets/icons/SidebarIcon.svg'
import { useSidebarState } from './Sidebar'

const { toggle, isMobile } = useSidebarState()
</script>

<style scoped>
.chat-main {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

.chat-container {
  background: var(--neutral-100);
  height: 100%;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid var(--neutral-400);
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid var(--neutral-400);
  margin: 0 -20px 20px -20px;
  background: var(--neutral-100);
}

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

.input-section {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #f0f4ff, #e6f0ff);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--neutral-400);
  width: 400px;
  height: 58px;
}

.input-section input {
  flex: 1;
  padding: 12px 16px;
  border: none;
  background: transparent;
  outline: none;
  color: var(--neutral-700);
}

.input-section input::placeholder {
  color: var(--neutral-600);
}

.input-btn {
  margin: 5px;
}

.sidebar-header-btn {
  background: var(--neutral-100);
}

@media (max-width: 1023px) {
  .chat-container {
    padding: 20px;
    border-radius: 14px;
  }

  .chat-header {
    padding: 12px 20px;
    margin: 0 -20px 15px -20px;
  }

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
  .chat-container {
    padding: 15px;
    border-radius: 12px;
  }

  .chat-header {
    padding: 10px 15px;
    margin: 0 -15px 15px -15px;
  }

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
  .chat-container {
    padding: 12px;
  }

  .chat-header {
    padding: 8px 12px;
    margin: 0 -12px 12px -12px;
  }

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
