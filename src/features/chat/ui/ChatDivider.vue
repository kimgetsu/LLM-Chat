<template>
  <p class="creation-date d-1 regular">
    {{ formatDate(props.date) }} | {{ formatTime(props.date) }}
  </p>
</template>

<script setup lang="ts">
import { formatDate, formatTime } from '@/shared/lib/date'

const props = defineProps<{ date: number }>()
</script>

<style>
.creation-date {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  padding: 8px;
  position: relative;
  color: var(--neutral-600);
  margin-bottom: 20px;
}

.creation-date::before,
.creation-date::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid var(--neutral-300);
  margin: auto 12px;
  max-width: 228px;
}
</style>
