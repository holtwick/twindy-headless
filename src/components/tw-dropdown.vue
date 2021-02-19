<!-- Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright -->

<template>
  <div ref="target" style="display: inline-block" @click="trigger">
    <slot class="tw-dropdown"></slot>
  </div>
  <tw-popover
    arrow
    v-model="active"
    :target="target"
    role="dropdown"
    theme="dropdown"
    transition="tw-tooltip-transition"
  >
    <slot name="content">Define #content</slot>
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
    let active = ref<boolean>(false)
    let anchor = ref()
    let target = ref<Node>()

    const methods = {
      trigger() {
        active.value = !active.value
        console.log("trigger", active.value)
      },
    }

    return {
      ...methods,
      target,
      anchor,
      active,
    }
  },
}
</script>
