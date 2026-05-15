<template>
  <div class="markdown-content" v-html="html"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'

const props = withDefaults(
  defineProps<{
    text: string
    breaks?: boolean
    gfm?: boolean
  }>(),
  {
    breaks: true,
    gfm: true,
  }
)

const html = computed(() => {
  if (!props.text) return ''
  return marked.parse(props.text, {
    breaks: props.breaks,
    gfm: props.gfm,
  })
})
</script>

<style scoped>
.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3) {
  margin: 0.5em 0 0.25em;
}

.markdown-content :deep(p) {
  margin: 0.25em 0;
}

.markdown-content :deep(pre) {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 1em;
  border-radius: 8px;
  overflow-x: auto;
}

.markdown-content :deep(code) {
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  padding-left: 1.5em;
}

.markdown-content :deep(blockquote) {
  border-left: 3px solid var(--primary-200);
  padding-left: 1em;
  opacity: 0.8;
}
</style>
