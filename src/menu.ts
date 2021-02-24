import { Ref } from "vue"
import { TwindyMenuItem } from "./types"

export function useMenu(items: TwindyMenuItem[], ref?: Ref) {
  return {
    toggleMenu(event?: MouseEvent) {
      console.log("toggle menu")
    },
  }
}
