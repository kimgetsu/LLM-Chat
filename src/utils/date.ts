import { format } from 'date-fns'

export const time = (t: number) => {
  return format(t, 'h:mm a')
}
export const date = (t: number) => {
  return format(t, 'MMM d').toUpperCase()
}
