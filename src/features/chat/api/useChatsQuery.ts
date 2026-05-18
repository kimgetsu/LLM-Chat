import { useInfiniteQuery } from '@tanstack/vue-query'
import { fetchChatsFromApi } from './chatApi'
import { chatQueryKeys } from './queryKeys'

export function useChatsQuery() {
  return useInfiniteQuery({
    queryKey: chatQueryKeys.chats(),
    queryFn: ({ pageParam }: { pageParam: string | null }) => fetchChatsFromApi(pageParam),
    getNextPageParam: lastPage => lastPage.nextCursor,
    initialPageParam: null,
  })
}
