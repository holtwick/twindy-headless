<!-- Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright -->

<template>
  <transition :name="transition">
    <div
      :data-transition="transition"
      class="tw-popover"
      :class="`-${theme}`"
      ref="popover"
      :id="id"
      v-show="target"
      :aria-hidden="target == null"
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
</template>

<script lang="ts">
import { createPopper } from "@popperjs/core"
import { defineComponent } from "vue"
import { UUID } from "./lib/uuid"

const log = require("debug")("ui:popover")

class RefObj {
  constructor(box) {
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
  name: "tw-popover",
  props: {
    target: {
      type: Element | Object,
      default: null,
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
  data() {
    return {
      popper: null,
      element: null,
      id: UUID(),
    }
  },
  methods: {
    async show() {
      let target = this.target
      log("should show", target)

      if (target) {
        this.hide()

        await this.$nextTick()

        this.element = this.$refs.popover
        // this.element = document.getElementById(this.id)
        if (this.element) {
          // target = this.target
          if (!(target instanceof Node)) {
            target = new RefObj(target)
          }

          // https://popper.js.org/docs/v2/tutorial/
          this.popper = createPopper(target, this.element, {
            // https://popper.js.org/popper-documentation.html#defaults
            placement: this.placement,
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: this.offset,
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
      log("hide popper")
      if (this.popper) {
        this.popper.destroy()
        this.popper = null
      }
    },
  },

  async mounted() {
    log("mounted")

    await this.$nextTick()
    await this.show()

    // this.messageHandler('repaint', e => {
    //   this?.popper?.update()
    // })

    // window.addEventListener('mousedown', event => {
    //   log('catch mousedown')
    //   if (!this.element?.contains(event.target)) {
    //     this.hide()
    //   }
    // })
  },

  watch: {
    target() {
      this.show()
    },
  },

  beforeDestroy() {
    log("beforeDestroy")
    this.hide()
  },
})
</script>
