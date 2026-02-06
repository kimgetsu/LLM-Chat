<template>
  <aside :class="['sidebar', {'collapsed': isCollapsed}]">
    <div class="sidebar-container">
      <header class="sidebar-header">
        <div class="header-content">
          <img 
            src="../assets/icons/Avatar.png" 
            alt="Avatar" 
            class="avatar"
          >
          <p v-if="!isCollapsed" class="username">Denis Kim</p>
        </div>
        <div class="header-actions" :class="{'collapsed': isCollapsed}">
          <!-- Иконка настроек всегда видна -->
          <button type="button">
            <img src="../assets/icons/Settings.svg" alt="Settings" class="icon">
          </button>
          <button type="button" @click="toggleCollapse" class="collapse-btn">
            <img src="../assets/icons/Sidebar.svg" alt="Toggle sidebar" class="icon">
          </button>
        </div>
      </header>

      <section v-if="!isCollapsed" class="chat-history">
        <h2 class="history-title">CHAT HISTORY</h2>
        <ul class="chat-list">
          <li class="chat-item">
            <a href="#" class="chat-link">
              <span class="chat-title">How to improve my English skills?</span>
            </a>
          </li>
          <li class="chat-item">
            <a href="#" class="chat-link">
              <span class="chat-title">Help me debug this JS code</span>
            </a>
          </li>
          <li class="chat-item">
            <a href="#" class="chat-link">
              <span class="chat-title">Write a poem about the heat of her hair, the coals in a January fire and how I burn in it</span>
            </a>
          </li>
        </ul>
      </section>

      <footer v-if="!isCollapsed" class="sidebar-footer">
        <div class="btn-border">
          <button>+ Start new chat</button>
        </div>
      </footer>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isCollapsed = ref(false)
const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
  if (isMobile.value) {
    isCollapsed.value = true
  }
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<style scoped>
.sidebar {
  width: 296px;
  min-width: 296px;
  background: #F7F8FA;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: width 0.4s ease-in-out, transform 0.3s ease-in-out;
  position: relative;
  z-index: 100;
  overflow: hidden;
}

.sidebar.collapsed {
  width: 60px;
  min-width: 60px;
}

.sidebar.collapsed .sidebar-header {
  flex-direction: column;
  align-items: center;
  gap: 32px;
  margin-bottom: 0;
  padding: 24px 0;
}

.sidebar.collapsed .header-content {
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.sidebar.collapsed .header-actions {
  flex-direction: column;
  align-items: center;
  gap: 32px;
  margin-top: 20px;
}

.sidebar.collapsed .username,
.sidebar.collapsed .chat-history,
.sidebar.collapsed .sidebar-footer {
  display: none;
}

.sidebar-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  height: 100%;
  box-sizing: border-box;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  width: 100%;
  transition: all 0.3s ease;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  background: #e2e8f0;
  flex-shrink: 0;
}

.username {
  margin: 0;
  font-weight: 500;
  font-size: 16px;
  line-height: 130%;
  color: #19213D;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}

.header-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.header-actions.collapsed {
  flex-direction: column;
  gap: 32px;
}

.header-actions button {
  background: none;
  border: none;
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666F8D;
  transition: all 0.2s ease;
  padding: 0;
  flex-shrink: 0;
}

.header-actions button:hover {
  background: #e2e8f0;
}

.icon {
  width: 20px;
  height: 20px;
  display: block;
}

.chat-history {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
}

.history-title {
  font-size: 12px;
  font-weight: 500;
  line-height: 130%;
  color: #BAC0CC;
  text-transform: uppercase;
  margin: 0 0 16px 0;
  letter-spacing: 0.5px;
}

.chat-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.chat-item {
  border-radius: 8px;
  overflow: hidden;
}

.chat-link {
  display: block;
  padding: 14px 12px;
  text-decoration: none;
  color: #666F8D;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  background: transparent;
}

.chat-link:hover {
  background: #e2e8f0;
}

.chat-title {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-footer {
  margin-top: auto;
  padding-top: 20px;
}

.btn-border {
  background: linear-gradient(90deg, #174BD2, #185AC2);
  border-radius: 8px;
  display: block;
  width: 100%;
  height: 48px;
  transition: all 0.3s ease;
  padding: 1px;
}

.btn-border button {
  background: linear-gradient(90deg, #2B7AFB, #2174FD, #213BFD);
  border: none;
  outline: none;
  border-radius: 7px;
  padding: 0;
  color: white;
  cursor: pointer;
  font-size: 14px;
  line-height: 130%;
  width: 100%;
  height: 100%;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.btn-border:hover {
  background: linear-gradient(90deg, #1443b8, #1552b0);
}

.btn-border:hover button {
  background: linear-gradient(90deg, #266de0, #1e68e0, #1d36e0);
}

@media (max-width: 1023px) {
  .sidebar:not(.collapsed) {
    width: 240px;
    min-width: 240px;
  }
  
  .sidebar-container {
    padding: 20px;
  }
  
  .username {
    font-size: 14px;
    max-width: 120px;
  }
  
  .history-title {
    font-size: 11px;
  }
  
  .chat-link {
    padding: 12px 10px;
    font-size: 13px;
  }
  
  .btn-border {
    height: 42px;
  }
  
  .sidebar.collapsed {
    width: 60px;
    min-width: 60px;
  }
}

@media (max-width: 767px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 60px;
    min-width: 60px;
    z-index: 100;
    transform: translateX(0);
    transition: width 0.3s ease-in-out;
  }
  
  .sidebar:not(.collapsed) {
    width: 280px;
    min-width: 280px;
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }
  
  .sidebar-container {
    padding: 20px 16px;
  }
  
  .sidebar-header {
    margin-bottom: 30px;
  }
  
  .username {
    font-size: 15px;
    max-width: 140px;
  }
  
  .history-title {
    font-size: 11px;
  }
  
  .chat-link {
    padding: 12px 10px;
    font-size: 13px;
  }
  
  .btn-border {
    height: 44px;
  }
}
</style>