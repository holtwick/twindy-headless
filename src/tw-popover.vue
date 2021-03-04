<!-- Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright -->

<template>
  <teleport to="body">
    <div
      :data-transition="transition"
      class="tw-popover"
      :class="`-${theme}`"
      ref="popover"
      :id="id"
      v-show="open && target"
      :aria-hidden="!(open && target)"
      draggable="false"
    >
      <div
        v-show="arrow"
        id="arrow"
        class="tw-popover-arrow"
        :class="`-${theme}-arrow`"
        data-popper-arrow
      ></div>
      <div class="tw-popover-inner" :class="`-${theme}-inner`">
        {{ text }}
        <slot />
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { createPopper } from "@popperjs/core"
import type { StrictModifiers } from "@popperjs/core"
import { useEventListener } from "@vueuse/core"
import {
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  onUpdated,
  PropType,
} from "vue"
import { UUID } from "./lib/uuid"
import { useActive } from "./use/active"

// if (document.getElementById("__popoverContainer") == null) {
//   var popoverContainer = document.createElement("div")
//   popoverContainer.id = "__popoverContainer"
//   popoverContainer.setAttribute(
//     "style",
//     "position: absolute; top: 0; left: 0; width: 1px; height: 1px; overflow: hidden"
//   )
//   document.body.appendChild(popoverContainer)
// }

interface Box {
  left: number
  top: number
  bottom: number
  right: number
}

class RefObj {
  box: Box

  constructor(box: Box) {
    this.box = box
  }

  getBoundingClientRect() {
    return this.box
  }

  get clientWidth() {
    return Math.abs(this.box.right - this.box.left)
  }

  get clientHeight() {
    return Math.abs(this.box.bottom - this.box.top)
  }
}

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    target: {
      type: [Object, Boolean] as PropType<HTMLElement | false>,
      default: false,
    },
    transition: {
      type: String,
      default: "tw-popover-fade",
    },
    arrow: {
      type: Boolean,
      default: true,
    },
    placement: {
      default: "top",
    },
    theme: {
      default: "dropdown",
    },
    text: {
      default: "",
    },
    offset: {
      default: () => [0, 8],
    },
  },
  emits: ["update:modelValue"],
  setup(props: any, { emit }) {
    let popper: any, element
    let popover = ref<HTMLElement>()
    let id = ref(UUID())
    let open = useActive(props)

    async function show() {
      console.log("tw-popover show")
      let target = <Node | Box>props.target
      if (target != null) {
        hide()
        await nextTick()
        element = popover.value
        if (element) {
          let popperTarget: Node | RefObj
          if (target instanceof Node) {
            popperTarget = target
          } else {
            popperTarget = new RefObj(target)
          }

          // https://popper.js.org/docs/v2/tutorial/
          // @ts-ignore
          popper = createPopper<StrictModifiers>(popperTarget, element, {
            // https://popper.js.org/popper-documentation.html#defaults
            placement: props.placement,
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: props.offset,
                },
              },
              {
                name: "preventOverflow",
                options: {
                  // escapeWithReference: true,
                  boundariesElement: "window",
                  padding: 8,
                },
              },
            ],
          })
        }
      }
    }

    function hide() {
      console.log("tw-popover hide")
      if (popper != null) {
        popper.destroy()
        popper = null
      }
    }

    useEventListener(window, "mousedown", (event) => {
      if (
        open.value === true &&
        !(
          props?.target?.contains(event.target) ||
          popper?.value?.contains(event.target)
        )
      ) {
        emit("update:modelValue", false)
      }
    })

    function checkActive() {
      console.log(
        "open",
        props.active,
        props.modelValue,
        props.target,
        open.value
      )
      if (open.value && props.target) {
        hide()
        nextTick()
        show()
      } else {
        hide()
      }
    }

    watch([() => open.value, () => props.target], checkActive)

    onMounted(checkActive)
    onUpdated(checkActive)
    onBeforeUnmount(hide)

    return {
      id,
      popover,
      open,
    }
  },
})
</script>
