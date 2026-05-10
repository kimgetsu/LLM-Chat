import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { createChatFromApi } from './chatApi'

export function useCreateChatMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createChatFromApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chats'] })
    },
  })
}
