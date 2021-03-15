import { useEventListener, useResizeObserver } from "@vueuse/core"
import { onUpdated, Ref } from "vue"

export function useTextareaResize(r: Ref<HTMLTextAreaElement>): void {
  const resize = () => {
    let el = r.value
    if (el) {
      el.style.height = "1px"
      el.style.height = el.scrollHeight + 2 + "px"
    }
  }

  onUpdated(() => {
    let el = r?.value
    if (el) {
      el.setAttribute(
        "style",
        "height:" + (el.scrollHeight + 2) + "px;overflow-y:hidden;resize:none;"
      )
    }
  })

  useEventListener(r, "input", resize)
  useResizeObserver(r, resize)
}
