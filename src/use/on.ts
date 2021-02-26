import { onBeforeUnmount, onMounted } from "vue"
import { TwindyEventEmitter } from "../types"

export function useOn(
  emitter: TwindyEventEmitter,
  eventName: string,
  fn: EventHandlerNonNull,
  trigger = false
) {
  onMounted(() => {
    if (trigger === true) {
      fn(null)
    }
    emitter.on(eventName, fn)
  })
  onBeforeUnmount(() => {
    emitter.off(eventName, fn)
  })
  return () => {
    emitter.off(eventName, fn)
  }
}
