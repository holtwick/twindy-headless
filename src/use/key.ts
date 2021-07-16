import { onBeforeUnmount, onMounted } from "vue"

interface KeyListener {
  key: string
  ignoreInput: boolean
  handler: Function
}

let listeners: KeyListener[] = []

let handler = (ev: KeyboardEvent) => {
  for (let { key, ignoreInput, handler } of listeners) {
    // @ts-ignore
    let tagName = ev.target.tagName
    if (ignoreInput && ["INPUT", "TEXTAREA"].includes(tagName)) {
      continue
    }
    // console.log("key match", key)
    if (ev.key === key) {
      handler(ev)
      ev.preventDefault()
      ev.stopPropagation()
    }
  }
}

function addListener(listener: KeyListener) {
  if (listeners.length <= 0) {
    window.addEventListener("keydown", handler)
  }
  listeners.push(listener)
}

function removeListener(listener: KeyListener) {
  let index = listeners.indexOf(listener)
  if (index >= 0) {
    listeners.splice(index, 1)
  }
  if (listeners.length <= 0) {
    window.removeEventListener("keydown", handler)
  }
}

/**
 * Also consider https://vueuse.org/core/usemagickeys/#usemagickeys
 */
export function useKey(
  key: string,
  fn: EventHandlerNonNull,
  opt: { ignoreInputElements: boolean } = { ignoreInputElements: true }
) {
  const handler: KeyListener = {
    key,
    ignoreInput: opt?.ignoreInputElements === true,
    handler: fn,
  }

  onMounted(() => {
    addListener(handler)
  })
  onBeforeUnmount(() => {
    removeListener(handler)
  })
}
