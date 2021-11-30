import { createApp } from "vue"
import twTooltipTrigger from "./tw-tooltip-trigger.vue"

if (typeof document !== "undefined") {
  let container = document.createElement("div")
  document.body.appendChild(container)
  createApp(twTooltipTrigger).mount(container)
}

export function useTooltip() {
  return {}
}
