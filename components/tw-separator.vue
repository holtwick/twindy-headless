<!-- Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright -->

<template>
  <div
    class="-separator"
    @mousedown="onMouseDown"
    @touchstart="onMouseDown"
    @dblclick="onDblClick"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue"

// Passive: false to prevent scrolling while touch dragging.
const mouseOptions = { passive: false }

export default defineComponent({
  name: "tw-separator",
  data() {
    return {
      dragging: false,
      collapsed: false,
      deltaX: 0,
      deltaY: 0,
      startX: 0,
      startY: 0,
      onUp: null,
      onMove: null,
    }
  },
  mounted() {},
  methods: {
    bindEvents() {
      this.onMove = (e) => this.onMouseMove(e)
      this.onUp = (e) => this.onMouseUp(e)

      // https://github.com/antoniandre/splitpanes/blob/master/src/components/splitpanes/splitpanes.vue
      document.addEventListener("mousemove", this.onMove, mouseOptions)
      document.addEventListener("mouseup", this.onUp)
      if ("ontouchstart" in window) {
        document.addEventListener("touchmove", this.onMove, mouseOptions)
        document.addEventListener("touchend", this.onUp)
      }
    },
    unbindEvents() {
      document.removeEventListener("mousemove", this.onMove, mouseOptions)
      document.removeEventListener("mouseup", this.onUp)
      if ("ontouchstart" in window) {
        document.removeEventListener("touchmove", this.onMove, mouseOptions)
        document.removeEventListener("touchend", this.onUp)
      }
    },
    onMouseDown(e) {
      // log('Mousedown')
      this.dragging = true
      this.startX = e.pageX
      this.startY = e.pageY
      this.bindEvents()
      this.$emit("start", {})
    },
    onMouseMove(e) {
      this.deltaX = e.pageX - this.startX
      this.deltaY = e.pageY - this.startY
      // log('MouseMove', this.deltaX)
      this.$emit("update", {
        x: this.deltaX,
        y: this.deltaY,
      })
    },
    onMouseUp(e) {
      this.dragging = false
      this.unbindEvents()
      this.$emit("end", {
        x: this.deltaX,
        y: this.deltaY,
      })
    },
    onDblClick(e) {
      // log('Double click')
      this.collapsed = !this.collapsed
    },
  },
})
</script>
