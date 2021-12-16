import { createApp, Ref } from "vue"
import twMenu from "./tw-menu.vue"
import { TwindyMenuItem } from "./types"

let container: HTMLElement | undefined

export function useMenu(items: TwindyMenuItem[], ref?: Ref) {
  if (container == null) {
    let container = document.createElement("div")
    document.body.appendChild(container)
    createApp(twMenu).mount(container)
  }

  return {
    toggleMenu() {
      // console.log("toggle menu")
    },
  }
}
