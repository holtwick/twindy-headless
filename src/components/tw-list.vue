<!-- Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright -->

<template>
  <div
    class="tw-list"
    @scroll="onScroll"
    :class="{ '-scrollable': scrollable }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "tw-list",
  props: {
    distance: {
      type: Number,
      default: 50,
    },
    scrollable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      count: 0,
      loading: false,
    }
  },
  mounted() {
    this.doMore()
  },
  methods: {
    doMore() {
      this.$emit("load", {
        start: 0,
        end: this.distance,
      })
    },
    onScroll(ev) {
      const scrollY = ev.target.scrollTop
      const visible = ev.target.clientHeight
      const bufferHeight = /* this.getFillHeight */ +visible * 0.75 // px before scroll end
      const pageHeight = ev.target.scrollHeight - bufferHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      if (bottomOfPage) {
        this.doMore(false)
      }
    },
  },
})
</script>
