import { onBeforeUnmount, onMounted } from "vue"

export function useKey(
  key: string,
  fn: EventHandlerNonNull,
  opt: { ignoreInputElements: boolean } = { ignoreInputElements: true }
) {
  let handler = (ev: KeyboardEvent) => {
    console.log("key", key, opt?.ignoreInputElements, ev.key)
    // @ts-ignore
    let tagName = ev.target.tagName
    console.log("key match", key)
    if (ev.key === key) {
      const ignoreInput = opt?.ignoreInputElements === true
      if (ignoreInput !== true || !["INPUT", "TEXTAREA"].includes(tagName)) {
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
