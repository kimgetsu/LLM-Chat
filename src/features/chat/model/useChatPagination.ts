import { ref } from 'vue'

export function useChatPagination() {
  const chatsNextCursor = ref<string | null>(null)
  const chatsHasMore = ref<boolean>(true)
  const isLoadingMoreChats = ref<boolean>(false)
  const messagesCursorByChatId = ref<Record<string, string | null>>({})
  const messagesHasMoreByChatId = ref<Record<string, boolean>>({})
  const isLoadingMoreMessagesByChatId = ref<Record<string, boolean>>({})

  function resetChatsPagination() {
    chatsNextCursor.value = null
    chatsHasMore.value = true
    isLoadingMoreChats.value = false
  }

  function updateChatsPagination(nextCursor: string | null) {
    chatsNextCursor.value = nextCursor
    chatsHasMore.value = nextCursor !== null
  }

  function setChatLoading(chatId: string, loading: boolean) {
    isLoadingMoreMessagesByChatId.value = {
      ...isLoadingMoreMessagesByChatId.value,
      [chatId]: loading,
    }
  }

  function updateMessagesPagination(chatId: string, nextCursor: string | null) {
    messagesCursorByChatId.value = { ...messagesCursorByChatId.value, [chatId]: nextCursor }
    messagesHasMoreByChatId.value = {
      ...messagesHasMoreByChatId.value,
      [chatId]: nextCursor !== null,
    }
  }

  function isChatLoading(chatId: string): boolean {
    return isLoadingMoreMessagesByChatId.value[chatId] ?? false
  }

  return {
    chatsNextCursor,
    chatsHasMore,
    isLoadingMoreChats,
    messagesCursorByChatId,
    messagesHasMoreByChatId,
    isLoadingMoreMessagesByChatId,
    resetChatsPagination,
    updateChatsPagination,
    setChatLoading,
    updateMessagesPagination,
    isChatLoading,
  }
}
