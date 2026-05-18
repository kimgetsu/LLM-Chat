import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { createChatFromApi } from './chatApi'
import { chatQueryKeys } from './queryKeys'

export function useCreateChatMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createChatFromApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatQueryKeys.chats() })
    },
  })
}
