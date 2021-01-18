<!-- Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright -->

<template>
  <div class="tw-tooltip-trigger" ref="tooltipAnchor" :aria-describedby="id">
    <div
      class="tw-tooltip-trigger-inner"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @focus="showTooltip"
      @blur="hideTooltip"
      @click="hideTooltip"
      @contextmenu="hideTooltip"
    >
      <slot></slot>
    </div>
    <tw-popover
      v-if="title"
      :target="target"
      role="tooltip"
      :id="id"
      theme="tooltip"
      arrow
      transition="tw-tooltip-transition"
    >
      <slot name="content">{{ title }}</slot>
    </tw-popover>
  </div>
</template>

<script lang="ts">
import { createPopper } from "@popperjs/core"
import {
  defineComponent,
  nextTick,
  onBeforeUnmount,
  reactive,
  ref,
  watchEffect,
} from "vue"
import { UUID } from "./lib/uuid"
import twPopover from "./tw-popover.vue"

const log = require("debug")("ui:tooltip")

export default {
  components: {
    twPopover,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      target: null,
      id: UUID(), // https://accessibility.athena-ict.com/aria/examples/tooltip.shtml
      hoverCount: 0,
    }
  },
  // computed: {
  //   slottedTitle() {
  //     return this.title || this.$slots?.content?.[0] != null
  //   }
  // },

  setup(props: any) {
    let tooltipAnchor = ref()
    let target = ref<Node>()
    let hoverCount = 0

    const methods = {
      showTooltip() {
        console.log("Show tooltip", tooltipAnchor)
        target.value = tooltipAnchor.value
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
      tooltipAnchor,
    }
  },
}
</script>
