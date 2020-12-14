<!-- Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright -->

<template>
  <div
    class="tw-list -fit vstack"
    @scroll="onScroll"
    :class="{ '-scrollable': scrollable }"
  >
    <slot></slot>
  </div>
</template>

<script>
const log = require("debug")("ui:list")

export default {
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
      log("do more")
      this.$emit("load", {
        start: 0,
        end: this.distance,
      })
    },
    onScroll(ev) {
      // log('do scroll')
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
}
</script>

