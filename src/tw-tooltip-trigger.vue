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
import { Logger } from "zeed"

// const log = Logger("tw:tooltip")
// log.active = false

var _activated = false
var ignore = false

export default defineComponent({
  props: {
    placement: {
      default: "top",
    },
    active: Boolean,
    target: HTMLElement,
    text: String,
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
      // log("onTooltipHover", ignore, ev)
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
      // log("onTouchDown")
      active.value = false
      ignore = true
    }

    let onTouchUp = (ev: Event) => {
      // log("onTouchUp")
      ignore = false
    }

    const useCapture = true

    useEventListener(window, "mouseover", onTooltipHover, useCapture)

    // These are for handling touch events. Since mouseover comes AFTER touch events
    // we use `mouseup` to finish the touch exception. We cannot generally set
    // ignore on first touch, because these days devices may have mixed input
    useEventListener(window, "touchstart", onTouchDown, useCapture)
    useEventListener(window, "mouseup", onTouchUp, useCapture)

    // useEventListener(window, "focus", onTooltipHover, useCapture)

    // log("did setup tooltips")

    return {
      placement,
      target,
      text,
      active,
    }
  },
})
</script>
