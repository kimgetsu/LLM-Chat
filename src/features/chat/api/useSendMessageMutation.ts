import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { sendMessageToApi } from './chatApi'
import { v4 as uuidv4 } from 'uuid'
import type { Attachment } from '@/entities/attachment/types'
import { chatQueryKeys } from './queryKeys'

export function useSendMessageMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (variables: {
      chatId: string
      text: string
      attachments?: Attachment[]
      isRetry?: boolean
      requestId?: string
    }) => {
      const clientMessageId = variables.isRetry ? uuidv4() : (variables.requestId ?? uuidv4())
      return sendMessageToApi(variables.chatId, variables.text, {
        clientMessageId,
        attachments: variables.attachments,
        isRetry: variables.isRetry,
        requestId: variables.requestId,
      })
    },

    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({
        queryKey: chatQueryKeys.messages(variables.chatId),
      })
    },
  })
}
