import { useEventListener } from "@vueuse/core"
import { Ref, ref } from "vue"
import { Logger } from "zeed"

const log = Logger("use-separator")

export function useSeparator(
  el: Ref<HTMLElement>,
  value?: Ref<number>,
  opt: {
    minValue?: number
    maxValue?: number
  } = {}
) {
  log("separator", el, value, opt)
  let dragging = ref(false)
  let collapsed = ref(false)
  let startX = 0
  let startY = 0
  let deltaX = ref(0)
  let deltaY = ref(0)
  let startValue = 0

  const { minValue = 0, maxValue = Infinity } = opt
  //console.log("minmax", minValue, maxValue)

  function onMouseDown(e: { pageX: number; pageY: number }) {
    log("mouse down")
    dragging.value = true
    startX = e.pageX
    startY = e.pageY
    startValue = value?.value || 0
    bindEvents()
  }

  function onMouseMove(e: { pageX: number; pageY: number }) {
    log("mouse move")
    if (!dragging.value) return
    deltaX.value = e.pageX - startX
    deltaY.value = e.pageY - startY
    if (value) {
      const size = Math.max(
        minValue,
        Math.min(maxValue, startValue + deltaX.value)
      )
      log("update size", size)
      value.value = size
    }
  }

  function onMouseUp() {
    log("mouse up")
    dragging.value = false
    unbindEvents()
  }

  function onDblClick() {
    collapsed.value = !collapsed.value
  }

  const mouseOptions = { passive: false }

  useEventListener(el, "mousedown", onMouseDown)
  useEventListener(el, "touchdown", onMouseDown)
  useEventListener(el, "dblclick", onDblClick)

  let docListeners: any[] = []

  // https://github.com/antoniandre/splitpanes/blob/master/src/components/splitpanes/splitpanes.vue
  function bindEvents() {
    docListeners = [
      useEventListener(document, "mousemove", onMouseMove, mouseOptions),
      useEventListener(document, "mouseup", onMouseUp),
      useEventListener(document, "touchmove", onMouseMove, mouseOptions),
      useEventListener(document, "touchend", onMouseUp),
    ]
  }

  function unbindEvents() {
    docListeners.forEach((stop) => stop())
    docListeners = []
  }

  return {
    dragging,
    collapsed,
    deltaX,
    deltaY,
  }
}
