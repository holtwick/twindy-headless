import { reactive } from "vue"
import { UUID } from "./lib/uuid"

export interface TwindyNotification {
  id?: string
  active?: boolean
  title: string
  message?: string
  timeout?: number
  confirm?: (id: string) => void
  cancel?: (id: string) => void
}

export let notifications: TwindyNotification[] = reactive([])

function deleteNotification(id?: string) {
  let index = notifications.findIndex((n) => n.id === id)
  if (index >= 0) {
    notifications.splice(index, 1)
    console.log("remove index", index, id)
  }
}

export function notification(n: TwindyNotification) {
  if (!n.id) n.id = UUID()
  if (!n.timeout) n.timeout = 5 * 1000
  if (!n.active) n.active = true

  if (n.timeout) {
    setTimeout(() => {
      n.active = false
      deleteNotification(n.id)
    }, n.timeout)
  }

  console.log("add id", n.id)
  notifications.unshift(n)
}
