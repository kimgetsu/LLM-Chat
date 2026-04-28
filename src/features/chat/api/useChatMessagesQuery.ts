import { useInfiniteQuery } from '@tanstack/vue-query'
import { fetchMessagesFromApi } from './chatApi'
import { type Ref, computed } from 'vue'

export function useChatMessagesQuery(chatId: Ref<string | null>) {
  return useInfiniteQuery({
    queryKey: ['chat', chatId, 'messages'],
    queryFn: ({ pageParam }: { pageParam: string | null }) =>
      fetchMessagesFromApi(chatId.value!, pageParam),
    getNextPageParam: lastPage => lastPage.nextCursor,
    enabled: computed(() => !!chatId.value),
    initialPageParam: null,
  })
}
