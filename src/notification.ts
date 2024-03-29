import { uname } from "zeed"
import { notifications } from "./state"
import { TwindyNotification } from "./types"
// import { createApp } from "vue"
// import twNotification from "./tw-notification.vue"

export function closeNotification(id?: string) {
  let index = notifications.value.findIndex((n) => n.id === id)
  if (index >= 0) {
    notifications.value.splice(index, 1)
    // console.log("remove index", index, id)
  }
}

// let container = document.createElement("div")
// document.body.appendChild(container)
// createApp(twNotification).mount(container)

export function emitNotification(n: TwindyNotification): TwindyNotification {
  if (!n.id) n.id = uname("tw-notification")
  if (!n.active) n.active = true
  if (n.timeout == null) n.timeout = 5 * 1000

  if (n.timeout != null && n.timeout > 0) {
    setTimeout(() => {
      n.active = false
      closeNotification(n.id)
    }, n.timeout)
  }

  n.close = () => closeNotification(n.id)

  notifications.value.unshift(n)
  // console.log("add id", n.id, notifications)

  return n
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
