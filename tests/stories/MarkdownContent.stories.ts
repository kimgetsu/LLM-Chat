import { MarkdownContent } from '../../src/shared/ui'

export default {
  component: MarkdownContent,
  title: 'shared/ui/MarkdownContent',
}

export const PlainText = {
  args: { text: 'Обычный текст без форматирования' },
}

export const Markdown = {
  args: {
    text: `# Заголовок первого уровня
## Заголовок второго уровня

**Жирный текст** и *курсив*.

- Элемент списка 1
- Элемент списка 2

\`\`\`
блок кода
\`\`\`

> Цитата`,
  },
}
