export const chatQueryKeys = {
  all: ['chats'] as const,
  chats: () => ['chats'] as const,
  messages: (chatId: string) => ['chat', chatId, 'messages'] as const,
}
