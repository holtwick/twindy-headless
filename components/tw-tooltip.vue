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
      v-if="slottedTitle"
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
import TwPopover from "./tw-popover.vue"
import { UUID } from "./lib/uuid"
import { defineComponent } from "vue"

const log = require("debug")("ui:tooltip")

export default defineComponent({
  name: "tw-tooltip",
  components: {
    TwPopover,
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
  computed: {
    slottedTitle() {
      return this.title || this.$slots?.content?.[0] != null
    },
  },
  methods: {
    showTooltip() {
      this.target = this.$refs.tooltipAnchor
    },
    hideTooltip() {
      this.target = null
      this.hoverCount = 0
    },
    onMouseEnter() {
      this.hoverCount += 1
      if (this.hoverCount === 1) {
        this.showTooltip()
      }
    },
    onMouseLeave() {
      this.hoverCount -= 1
      if (this.hoverCount <= 0) {
        this.hideTooltip()
      }
    },
  },
  beforeDestroy() {
    this.hideTooltip()
  },
})
</script>
