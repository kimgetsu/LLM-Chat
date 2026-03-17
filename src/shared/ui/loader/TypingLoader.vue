<template>
  <div class="typing-loader">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<style scoped>
.typing-loader {
  display: inline-flex;
  gap: 6px;
  align-items: center;
}

.typing-loader span {
  width: 6px;
  height: 6px;
  background-color: var(--neutral-600);
  border-radius: 50%;
  animation: blink 1.4s infinite both;
}

.typing-loader span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-loader span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes blink {
  0% {
    opacity: 0.2;
    transform: translateY(0);
  }
  20% {
    opacity: 1;
    transform: translateY(-3px);
  }
  40% {
    opacity: 0.2;
    transform: translateY(0);
  }
  100% {
    opacity: 0.2;
  }
}
</style>
