<!-- Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright -->

<template>
  <div
    class="tw-modal"
    :class="{ active: modelValue }"
    tabindex="-1"
    v-trap-focus
    aria-modal="true"
    :role="role"
  >
    <a @click="doCancel" class="tw-modal-overlay" aria-label="Close"></a>
    <div class="tw-modal-container">
      <header class="tw-modal-header modal-header -fix" v-if="title || close">
        <div class="hstack">
          <div class="tw-modal-title -fit">
            <slot name="title">{{ title }}</slot>
          </div>
          <tw-link
            v-if="close"
            xtooltip="Close"
            @click="doCancel"
            class="-fix"
            symbol="xmark"
            >X</tw-link
          >
        </div>
      </header>
      <section class="tw-modal-body modal-body -fit -scrollable">
        <slot></slot>
      </section>
      <footer class="tw-modal-footer modal-footer -fix">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import trapFocus from "./lib/directives/trapFocus"
import { removeElement } from "./lib/helpers"
import TwLink from "./tw-link.vue"
import TwSymbol from "./tw-symbol.vue"

const log = require("debug")("ui:modal")

export default defineComponent({
  name: "tw-modal",
  props: {
    modelValue: {
      type: Boolean,
    },
    title: {
      type: String,
      default: "",
    },
    close: {
      type: Boolean,
      default: true,
    },
    standalone: {
      type: Boolean,
      default: false,
    },
    role: {
      default: "dialog",
    },
    canCancel: {
      type: Boolean,
      default: true,
    },
    onCancel: {
      type: Function,
      default: () => {
        log("onCancel not defined")
      },
    },
  },
  components: {
    TwSymbol,
    TwLink,
  },
  directives: {
    trapFocus,
  },
  methods: {
    doCancel() {
      log("do cancel")
      this.$emit("cancel")
      let onCancel = this?.$parent?.onCancel || this?.onCancel
      if (onCancel) {
        onCancel.apply(null, arguments)
      }
      this.doClose()
    },
    doClose() {
      this.$emit("close", false)
      this.$emit("update:modelValue", false)

      if (this.standalone) {
        // Timeout for the animation complete before destroying
        setTimeout(() => {
          // this.value = false
          this.$destroy()
          removeElement(this.$el)
        }, 150)
      }
    },
    keyPress(event) {
      if (this.modelValue && event.keyCode === 27) {
        // Esc key
        this.doCancel("escape")
      }
    },
  },
  created() {
    document?.addEventListener("keyup", this.keyPress)
  },
  beforeMount() {
    // Insert the Dialog component in the element container
    if (this.standalone && typeof window !== "undefined") {
      this.$nextTick(() => {
        const container =
          /* document.querySelector(this.container) || */ document.body
        container.appendChild(this.$el)
      })
    }
  },
  beforeUnmount() {
    if (typeof window !== "undefined") {
      document?.removeEventListener("keyup", this.keyPress)
      // reset scroll
      // document?.documentElement.classList.remove('is-clipped')
    }
  },
})
</script>
