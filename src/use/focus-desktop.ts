import { watch } from "vue"
import { supportsTouch } from "../lib/helpers"

export function useFocusDesktopInput(input) {
  if (!supportsTouch) {
    watch(input, () => input?.value?.focus())
    // input?.value?.focus()
  }
}
