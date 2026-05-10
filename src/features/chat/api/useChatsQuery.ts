import { useInfiniteQuery } from '@tanstack/vue-query'
import { fetchChatsFromApi } from './chatApi'

export function useChatsQuery() {
  return useInfiniteQuery({
    queryKey: ['chats'],
    queryFn: ({ pageParam }: { pageParam: string | null }) => fetchChatsFromApi(pageParam),
    getNextPageParam: lastPage => lastPage.nextCursor,
    initialPageParam: null,
  })
}
