import { UUID } from "./lib/uuid"
import { createApp } from "vue"
import { notifications } from "./state"
import { TwindyNotification } from "./types"
import twNotification from "./tw-notification.vue"

function deleteNotification(id?: string) {
  let index = notifications.value.findIndex((n) => n.id === id)
  if (index >= 0) {
    notifications.value.splice(index, 1)
    console.log("remove index", index, id)
  }
}

let container = document.createElement("div")
document.body.appendChild(container)
createApp(twNotification).mount(container)

export function emitNotification(n: TwindyNotification) {
  if (!n.id) n.id = UUID()
  if (!n.timeout) n.timeout = 5 * 1000
  if (!n.active) n.active = true

  if (n.timeout) {
    setTimeout(() => {
      n.active = false
      deleteNotification(n.id)
    }, n.timeout)
  }

  notifications.value.unshift(n)
  console.log("add id", n.id, container, notifications)
}

export function useNotification(
  n: TwindyNotification = {
    title: "title is missing!",
  }
) {
  return (nn: TwindyNotification) => {
    emitNotification(Object.assign({}, n, nn))
  }
}
