<template>
  <tw-popover
    v-model="active"
    :target="target"
    arrow
    theme="tooltip"
    :placement="placement"
  >
    {{ text }}
  </tw-popover>
</template>

<script lang="ts">
import twPopover from "./tw-popover.vue"
import { defineComponent, ref } from "vue"
import { useEventListener } from "@vueuse/core"

var _activated = false
var ignore = false

export default defineComponent({
  props: {
    placement: {
      default: "top",
    },
  },
  components: {
    twPopover,
  },
  setup(props) {
    if (_activated) {
      console.error("tw-tooltip-trigger can only be activated once")
      return
    }

    _activated = true

    let active = ref<boolean>(false)
    let placement = ref(props.placement)
    let target = ref<HTMLElement | null>(null)
    let text = ref("")
    let debounceTimer: any = 0

    let onTooltipHover = (ev: Event) => {
      if (ignore) return

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
            active.value = true
            return
          }
          el = el.parentElement
        }
        active.value = false
        target.value = null
      }, /*props.delay || */ 50) // debounce
    }

    let onTouchDown = (ev: Event) => {
      active.value = false
      // ignore = true
    }

    const useCapture = true

    useEventListener(window, "touchdown", onTouchDown, useCapture)
    useEventListener(window, "mouseover", onTooltipHover, useCapture)
    // useEventListener(window, "focus", onTooltipHover, useCapture)

    return {
      placement,
      target,
      text,
      active,
    }
  },
})
</script>
