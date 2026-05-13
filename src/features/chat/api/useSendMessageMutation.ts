import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { sendMessageToApi } from './chatApi'
import { v4 as uuidv4 } from 'uuid'
import type { Attachment } from '@/entities/attachment/types'
import type { Message } from '@/features/chat/model/types'
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

    onMutate: async variables => {
      await queryClient.cancelQueries({
        queryKey: chatQueryKeys.messages(variables.chatId),
      })

      const previousMessages = queryClient.getQueryData(chatQueryKeys.messages(variables.chatId))

      const tempId = `temp-${uuidv4()}`
      const optimisticMessage: Message = {
        id: tempId,
        chatId: variables.chatId,
        role: 'user',
        content: variables.text,
        attachments: variables.attachments || [],
        status: 'ok',
        requestId: variables.requestId ?? uuidv4(),
        createdAt: Date.now(),
      }

      queryClient.setQueryData(chatQueryKeys.messages(variables.chatId), (oldData: any) => {
        if (!oldData) {
          return {
            pages: [{ newMessages: [optimisticMessage], nextCursor: null }],
            pageParams: [null],
          }
        }
        const newPages = oldData.pages.map((page: any, index: number) => {
          if (index === oldData.pages.length - 1) {
            return {
              ...page,
              newMessages: [...page.newMessages, optimisticMessage],
            }
          }
          return page
        })
        return { ...oldData, pages: newPages }
      })
      return { previousMessages, tempId }
    },
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(chatQueryKeys.messages(variables.chatId), (oldData: any) => {
        if (!oldData) return oldData
        const newPages = oldData.pages.map((page: any, index: number) => {
          if (index === oldData.pages.length - 1) {
            const filtered = page.newMessages.filter(
              (m: any) =>
                m.id !== context?.tempId &&
                !(m.role === 'user' && m.requestId === data.userMessage.requestId)
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

      const chatId = variables.chatId
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: chatQueryKeys.messages(chatId),
        })
      }, 1000)

      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: chatQueryKeys.messages(chatId),
        })
      }, 3000)
    },

    onError: (_, variables, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData(chatQueryKeys.messages(variables.chatId), context.previousMessages)
      }
    },
  })
}
