import { onBeforeUnmount, onMounted } from "vue"

export function useWindowResize(fn: EventHandlerNonNull) {
  onMounted(() => {
    window.addEventListener("resize", fn)
  })
  onBeforeUnmount(() => {
    window.removeEventListener("resize", fn)
  })
}
