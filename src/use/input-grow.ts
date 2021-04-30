import { useEventListener } from "@vueuse/core"
import { onMounted, Ref } from "vue"
import { useFontLoaded } from "./font-loaded"
import { useWindowResize } from "./window-resize"

export function useResizeInput(
  input: Ref<HTMLInputElement>,
  props: { minSize?: number; placeholder?: string }
) {
  let { minSize = 32, placeholder = "" } = props

  let resizeInput = () => {
    // console.log("resize")
    const el = input.value
    let value = el.value
    el.style.width = "1px"
    if (value === "") {
      el.value = placeholder
      el.style.width = Math.max(+minSize, el.scrollWidth) + "px"
      el.value = ""
    } else {
      el.style.width = Math.max(+minSize, value ? el.scrollWidth : 0) + "px"
    }
    // el.style.maxWidth = "80vw"
  }

  useWindowResize(resizeInput)

  // Some triggers
  useEventListener(input, "input", resizeInput)
  useEventListener(window, "load", resizeInput)
  useFontLoaded("Inter", resizeInput)

  onMounted(() => {
    resizeInput()
  })

  return {
    resize: resizeInput,
  }
}
