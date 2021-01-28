import { UUID } from "./lib/uuid"
import { createApp } from "vue"
import { notifications } from "./state"
import { TwindyNotification } from "./types"
import twNotification from "./tw-notification.vue"

function deleteNotification(id?: string) {
  let index = notifications.findIndex((n) => n.id === id)
  if (index >= 0) {
    notifications.splice(index, 1)
    console.log("remove index", index, id)
  }
}

let container = document.createElement("div")
document.body.appendChild(container)
createApp(twNotification).mount(container)

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

  console.log("add id", n.id, container)
  notifications.unshift(n)
}

export function useNotification() {
  return {
    trigger: notification,
  }
}
