import { marked } from 'marked'
import { computed } from 'vue'

export function useMarkdown(text: string | undefined | null) {
  const html = computed(() => {
    if (!text) return ''
    return marked.parse(text, {
      breaks: true,
      gfm: true,
    })
  })

  return { html }
}
