import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { sendMessageToApi } from './chatApi'
import { v4 as uuidv4 } from 'uuid'
import type { Attachment } from '@/entities/attachment/types'

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
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['chat', variables.chatId, 'messages'], (oldData: any) => {
        if (!oldData) return oldData
        const newPages = oldData.pages.map((page: any, index: number) => {
          if (index === oldData.pages.length - 1) {
            const filtered = page.newMessages.filter(
              (m: any) => !(m.role === 'user' && m.requestId === data.userMessage.requestId)
            )
            return {
              ...page,
              newMessages: [...filtered, data.userMessage],
            }
          }
          return page
        })
        return { ...oldData, pages: newPages }
      })
    },
  })
}
