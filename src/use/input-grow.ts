import { useEventListener } from "@vueuse/core"
import { onMounted, Ref } from "vue"
import { useWindowResize } from "./window-resize"

export function useResizeInput(
  input: Ref<HTMLInputElement>,
  props: { minSize?: number; placeholder?: string }
) {
  let { minSize = 32, placeholder = "" } = props

  let resizeInput = () => {
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

  useEventListener(input, "input", resizeInput)

  onMounted(() => {
    // let el = input.value
    // el.addEventListener("input", resizeInput)
    resizeInput()
  })

  // onBeforeUnmount(() => {
  //   input.value.removeEventListener("input", resizeInput)
  // })
}
