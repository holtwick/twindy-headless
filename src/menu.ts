import { createApp, Ref } from "vue"
import twMenu from "./tw-menu.vue"
import { TwindyMenuItem } from "./types"

// let container = document.createElement("div")
// document.body.appendChild(container)
// createApp(twMenu).mount(container)

export function useMenu(items: TwindyMenuItem[], ref?: Ref) {
  return {
    toggleMenu(event?: MouseEvent) {
      console.log("toggle menu")
    },
  }
}
