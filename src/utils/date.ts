import { format } from 'date-fns'

export const formatTime = (timestamp: number) => {
  return format(timestamp, 'h:mm a')
}
export const formatDate = (timestamp: number) => {
  return format(timestamp, 'MMM d').toUpperCase()
}
