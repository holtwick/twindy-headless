<template>
  <tw-popover :target="target" arrow theme="tooltip">
    {{ text }}
  </tw-popover>
</template>

<script lang="ts">
import twPopover from "./tw-popover.vue"
import { defineComponent, onBeforeUnmount, ref } from "vue"

export default defineComponent({
  props: {
    delay: {
      // ms
      type: Number,
      default: 500,
    },
  },
  components: {
    twPopover,
  },
  setup(props: any) {
    console.log("Tooltip Trigger")
    let target = ref()
    let text = ref("")

    let timer = 0

    let onTooltipHover = (ev: Event) => {
      console.log("mouse", props.delay, ev.type, ev.target)

      clearTimeout(timer)
      timer = 0

      if (ev.target instanceof HTMLElement) {
        let el: HTMLElement | undefined | null = ev.target
        setTimeout(() => {
          while (el != null && el.tagName !== "BODY") {
            let title = el.title
            if (title) {
              el.setAttribute("tooltip", title)
            }
            let tooltip = el.getAttribute("tooltip")
            if (tooltip) {
              el.title = ""
              target.value = el
              text.value = tooltip.toString().trim()
              return
            }
            el = el.parentElement
          }
        }, props.delay || 50)
      }
      target.value = null
    }

    const useCapture = true
    window.addEventListener("mouseover", onTooltipHover, useCapture)
    window.addEventListener("focus", onTooltipHover, useCapture)

    onBeforeUnmount(() => {
      window.removeEventListener("mouseover", onTooltipHover, useCapture)
      window.removeEventListener("focus", onTooltipHover, useCapture)
    })

    return {
      target,
      text,
    }
  },
})
</script>
