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
      <header class="tw-modal-header" v-if="title || close">
        <div class="tw-modal-title">
          <slot name="title">{{ title }}</slot>
        </div>
        <tw-link
          v-if="close"
          tooltip="Close"
          @click="doCancel"
          class="tw-modal-close"
          symbol="xmark"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-x"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </tw-link>
      </header>
      <section class="tw-modal-body">
        <slot></slot>
      </section>
      <footer class="tw-modal-footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue"
import trapFocus from "./lib/directives/trapFocus"
import { removeElement } from "./lib/helpers"
import TwLink from "./tw-link.vue"
import TwSymbol from "./tw-symbol.vue"

export default defineComponent({
  name: "tw-modal",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
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
        // log("onCancel not defined")
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
  emits: ["close", "update:modelValue", "didopen", "willclose"],
  methods: {
    doCancel() {
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
          // @ts-ignore
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
    doFocus() {
      this.$nextTick(() => {
        let el = this.$el.querySelector(".focus")
        console.log("FOCUS", this.$el)
        if (el) {
          el.focus()
        }
      })
    },
  },
  created() {
    document?.addEventListener("keyup", this.keyPress)
  },
  watch: {
    async modelValue(value) {
      console.log("modal", this.modalValue)
      if (value === true) {
        this.$emit("didopen")
        this.doFocus()
      } else {
        this.$emit("willclose")
      }
    },
  },
  // mounted() {
  //   this.$nextTick(() => {
  //     console.log("mounted", this.modalValue)
  //     if (this.modalValue) {
  //       this.doFocus()
  //     }
  //   })
  // },
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
  // setup(props) {},
})
</script>
