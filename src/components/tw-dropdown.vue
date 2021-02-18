<!-- Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright -->

<template>
  <div ref="target" style="display: inline-block">
    <slot class="tw-dropdown"></slot>
  </div>
  <tw-popover
    v-if="title"
    :target="target"
    arrow
    role="dropdown"
    theme="dropdown"
    transition="tw-tooltip-transition"
  >
    <slot name="content">{{ title }}</slot>
  </tw-popover>
</template>

<script lang="ts">
import { onBeforeUnmount, ref } from "vue"
import twPopover from "./tw-popover.vue"

export default {
  components: {
    twPopover,
  },
  props: {
    title: {
      type: String,
      default: "Hello",
    },
  },

  // computed: {
  //   slottedTitle() {
  //     return this.title || this.$slots?.content?.[0] != null
  //   }
  // },

  setup(props: any) {
    let anchor = ref()
    let target = ref<Node>()
    let hoverCount = 0

    const methods = {
      showTooltip() {
        target.value = anchor.value
      },
      hideTooltip() {
        // @ts-ignore
        target.value = null
        hoverCount = 0
      },
      onMouseEnter() {
        hoverCount += 1
        if (hoverCount === 1) {
          methods.showTooltip()
        }
      },
      onMouseLeave() {
        hoverCount -= 1
        if (hoverCount <= 0) {
          methods.hideTooltip()
        }
      },
    }

    onBeforeUnmount(methods.hideTooltip)

    return {
      ...methods,
      target,
      anchor,
    }
  },
}
</script>
