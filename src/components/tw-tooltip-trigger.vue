<template>
  <tw-popover :target="target" arrow theme="tooltip" :placement="placement">
    {{ text }}
  </tw-popover>
</template>

<script lang="ts">
import twPopover from "./tw-popover.vue"
import { defineComponent, onBeforeUnmount, ref } from "vue"

var active = false

export default defineComponent({
  props: {
    // delay: {
    //   // ms
    //   type: Number,
    //   default: 500,
    // },
    placement: {
      default: "top",
    },
  },
  components: {
    twPopover,
  },
  setup(props: any) {
    if (active) {
      console.error("tw-tooltip-trigger can only be activated once")
      return
    }

    active = true

    let placement = ref(props.placement)
    let target = ref()
    let text = ref("")
    let debounceTimer: any = 0

    let onTooltipHover = (ev: Event) => {
      clearTimeout(debounceTimer)
      let el: any = ev.target
      debounceTimer = setTimeout(() => {
        while (el != null && el?.tagName !== "BODY") {
          // let title = el.title
          // if (title) {
          //   el.setAttribute("tooltip", title)
          // }
          let tooltip = el.getAttribute("tooltip")
          if (tooltip && tooltip?.length > 0) {
            // el.title = ""
            target.value = el
            text.value = tooltip?.toString()?.trim() || ""

            placement.value =
              el.getAttribute("tooltip-placement") || props.placement
            return
          }
          el = el.parentElement
        }
        target.value = null
      }, /*props.delay || */ 50) // debounce
    }

    const useCapture = true
    window.addEventListener("mouseover", onTooltipHover, useCapture)
    // window.addEventListener("focus", onTooltipHover, useCapture)

    onBeforeUnmount(() => {
      window.removeEventListener("mouseover", onTooltipHover, useCapture)
      // window.removeEventListener("focus", onTooltipHover, useCapture)
    })

    return {
      placement,
      target,
      text,
    }
  },
})
</script>
