<template>
  <router-view />
</template>

<script setup lang="ts">
import { globalAuthGuard } from './router/guards'

globalAuthGuard()
</script>
