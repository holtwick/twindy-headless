import { onBeforeUnmount, onMounted } from "vue"

export function useKey(
  key: string,
  fn: EventHandlerNonNull,
  opt?: { ignoreInputElements: boolean }
) {
  let handler = (ev: KeyboardEvent) => {
    console.log("key", key, opt?.ignoreInputElements, ev.key)
    // @ts-ignore
    let tagName = ev.target.tagName
    console.log("key match", key)
    if (ev.key === key) {
      const check = opt?.ignoreInputElements !== true
      if ((check && !["INPUT", "TEXTAREA"].includes(tagName)) || !check) {
        fn(ev)
      }
      ev.preventDefault()
      ev.stopPropagation()
    }
  }
  onMounted(() => {
    window.addEventListener("keydown", handler)
  })
  onBeforeUnmount(() => {
    window.removeEventListener("keydown", handler)
  })
}
