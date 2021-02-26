import { watch, Ref } from "vue"
import { supportsTouch } from "../lib/helpers"

export function useFocusDesktopInput(input: Ref<HTMLElement>) {
  if (!supportsTouch) {
    watch(input, () => input?.value?.focus())
    // input?.value?.focus()
  }
}
