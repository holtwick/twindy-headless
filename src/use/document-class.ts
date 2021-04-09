import { onBeforeMount, onBeforeUnmount } from "vue"

export function useDocumentClass(className: string) {
  onBeforeMount(() => {
    document.documentElement.classList.add(className)
  })
  onBeforeUnmount(() => {
    document.documentElement.classList.remove(className)
  })
}
