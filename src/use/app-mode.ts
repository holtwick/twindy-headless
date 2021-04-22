import { onBeforeMount, onBeforeUnmount } from "vue"

// deprecated: prefer useDocumentClass

export function useAppMode() {
  let oldOverflow: string
  let oldHeight: string

  onBeforeMount(() => {
    oldOverflow = document.body.style.overflow
    oldHeight = document.body.style.height

    // const appStyle = "-webkit-overflow: hidden; overflow: hidden; height: 100%"
    // document.documentElement.setAttribute("style", appStyle)
    // document.body.setAttribute("style", appStyle)
    document.body.style.overflow = "hidden"
    document.body.style.height = "100%"
  })
  onBeforeUnmount(() => {
    document.body.style.overflow = oldOverflow
    document.body.style.height = oldHeight
  })
}
