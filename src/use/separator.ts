import { useEventListener } from "@vueuse/core"
import { useWindowResize } from "./window-resize"
import { onMounted, Ref, ref } from "vue"
import { Logger } from "zeed"

const log = Logger("use-separator")

interface SeparatorState {
  value: number
  startValue: number
  pageX: number
  pageY: number
  deltaX: number
  deltaY: number
}
export function useSeparator(
  el: Ref<HTMLElement>,
  value: Ref<number>,
  opt: {
    minValue?: number
    maxValue?: number
    calcFirstElementSize?: (info: SeparatorState) => number
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

  const {
    minValue = 0,
    maxValue = Infinity,
    calcFirstElementSize = (info) => {
      return Math.max(
        minValue,
        Math.min(maxValue, info.startValue + info.deltaX)
      )
    },
  } = opt
  //console.log("minmax", minValue, maxValue)

  let lastSeparatorState: SeparatorState = {
    startValue,
    deltaX: deltaX.value,
    deltaY: deltaY.value,
    pageX: 0,
    pageY: 0,
    value: value?.value ?? 0,
  }

  function onMouseDown(e: MouseEvent) {
    log("mouse down")
    const { pageX, pageY } = e
    dragging.value = true
    startX = pageX
    startY = pageY
    startValue = value?.value || 0
    bindEvents()
  }

  function onMouseMove(e: MouseEvent) {
    log("mouse move")
    if (!dragging.value) return
    const { pageX, pageY } = e
    deltaX.value = pageX - startX
    deltaY.value = pageY - startY
    if (value) {
      lastSeparatorState = {
        startValue,
        deltaX: deltaX.value,
        deltaY: deltaY.value,
        pageX,
        pageY,
        value: value.value,
      }
      log("lastSeparatorState =", lastSeparatorState)
      const size = calcFirstElementSize(lastSeparatorState)
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

  function recalc() {
    value.value = calcFirstElementSize(lastSeparatorState)
  }

  useWindowResize(recalc)
  onMounted(recalc)

  return {
    dragging,
    collapsed,
    deltaX,
    deltaY,
    recalc,
  }
}
