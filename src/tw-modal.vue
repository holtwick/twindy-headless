<!-- Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright -->

<template>
  <transition
    name="tw-modal-animation"
    @after-leave=""
    @after-enter="didAppear"
    appear
  >
    <div
      class="tw-modal"
      :class="{ active: !!modelValue }"
      v-if="!!modelValue"
      :tabindex="-1"
      v-trap-focus
      aria-modal="true"
      :role="role"
      ref="root"
    >
      <a
        @click="doCancel"
        class="tw-modal-overlay overlay"
        aria-label="Close"
      ></a>
      <div class="tw-modal-container">
        <header class="tw-modal-header header" v-if="title || close">
          <div class="tw-modal-title title">
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
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
        <section class="tw-modal-body body">
          <slot></slot>
        </section>
        <footer class="tw-modal-footer footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue"
import trapFocus from "./lib/directives/trapFocus"
import TwLink from "./tw-link.vue"
import TwSymbol from "./tw-symbol.vue"
import { useKey } from "./use/key"

export default defineComponent({
  components: {
    TwSymbol,
    TwLink,
  },
  props: {
    modelValue: {
      type: [Boolean, Object] as PropType<any>,
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
  directives: {
    trapFocus,
  },

  // https://v3.vuejs.org/guide/transitions-enterleave.html#javascript-hooks
  emits: [
    "close",
    "update:modelValue",
    "didOpen",
    "willClose",
    "didClose",
    "cancel",
  ],

  setup(props, { emit }) {
    console.log("setup")

    let root = ref()

    const methods = {
      doCancel() {
        emit("cancel")
        methods.doClose()
      },
      doClose() {
        emit("close", false)
        emit("update:modelValue", false)
      },
      doFocus() {
        root.value?.querySelector(".focus")?.focus()
      },
      didAppear() {
        console.log("did appear")
        methods.doFocus()
        emit("didOpen")
      },
    }

    useKey("Escape", methods.doCancel, { ignoreInputElements: false })

    return {
      ...methods,
      root,
    }
  },
})
</script>
