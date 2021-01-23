import { reactive } from "vue"
import { UUID } from "./lib/uuid"

export interface TwindyNotification {
  id?: string
  title: string
  message?: string
  timeout?: number
  confirm?: (id: string) => void
  cancel?: (id: string) => void
}

export let notifications: TwindyNotification[] = reactive([])

export function notification(n: TwindyNotification) {
  if (!n.id) n.id = UUID()
  if (!n.timeout) n.timeout = 5 * 1000
  notifications.unshift(n)
}
