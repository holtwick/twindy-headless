<!-- Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright -->

<template>
  <teleport to="body">
    <transition :name="transition">
      <div
        :data-transition="transition"
        class="tw-popover"
        :class="`-${theme}`"
        ref="popover"
        :id="id"
        v-show="modelValue"
        :aria-hidden="!modelValue"
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
    </transition>
  </teleport>
</template>

<script lang="ts">
import { createPopper } from "@popperjs/core"
import { useEventListener } from "@vueuse/core"
import { defineComponent, nextTick, onBeforeUnmount, ref, watch } from "vue"
import { UUID } from "./lib/uuid"

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
    target: {
      type: [Element, Boolean, Number],
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
      default: "popover",
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

    const methods = {
      async show() {
        let target = <Node | Box>props.target
        console.log("target", target)
        if (target != null) {
          methods.hide()
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
            popper = createPopper(popperTarget, element, {
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
      },

      hide() {
        if (popper != null) {
          popper.destroy()
          popper = null
        }
      },
    }

    useEventListener(window, "mousedown", (event) => {
      if (
        props.modelValue === true &&
        !(
          props?.target?.contains(event.target) ||
          popper?.value?.contains(event.target)
        )
      ) {
        emit("update:modelValue", false)
      }
    })

    // watchEffect(() => {
    //   if (props.target != null) {
    //     methods.show()
    //   }
    // })

    onBeforeUnmount(methods.hide)

    watch(
      () => props.modelValue,
      (active) => {
        console.log("upd", props.modelValue)
        if (active) methods.show()
        else methods.hide()
      }
    )

    // nextTick().then(() => {
    //   methods.show()
    // })

    return {
      id,
      popover,
    }
  },
})
</script>
