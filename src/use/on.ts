import { onBeforeUnmount, onMounted } from "vue"
import { TwindyEventEmitter, TwindyEventHandler } from "../types"

export function useOn(
  emitter: TwindyEventEmitter,
  eventName: string,
  fn: TwindyEventHandler,
  trigger = false
) {
  onMounted(() => {
    if (trigger === true) {
      fn(null)
    }
    if (emitter.on) {
      emitter.on(eventName, fn)
    } else if (emitter.addEventListener) {
      emitter.addEventListener(eventName, fn)
    }
  })

  onBeforeUnmount(() => {
    if (emitter.off) {
      emitter.off(eventName, fn)
    } else if (emitter.removeEventListener) {
      emitter.removeEventListener(eventName, fn)
    }
  })

  return () => {
    if (emitter.off) {
      emitter.off(eventName, fn)
    } else if (emitter.removeEventListener) {
      emitter.removeEventListener(eventName, fn)
    }
  }
}
