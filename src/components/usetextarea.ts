import { onUpdated, Ref } from "vue"

export function useTextareaResize(r: Ref<HTMLTextAreaElement>): void {
  const resize = () => {
    let el = r.value
    el.style.height = "1px"
    el.style.height = el.scrollHeight + 2 + "px"
  }

  onUpdated(() => {
    r.value.setAttribute(
      "style",
      "height:" +
        (r.value.scrollHeight + 2) +
        "px;overflow-y:hidden;resize:none;"
    )
  })

  // useEventListener(r, "input", resize)
  // useResizeObserver(r, resize)
}
