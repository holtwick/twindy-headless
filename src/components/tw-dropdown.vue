<!-- Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright -->

<template>
  <div ref="target" style="display: inline-block" @click="active = !active">
    <slot class="tw-dropdown"></slot>
  </div>
  <tw-popover
    arrow
    v-model="active"
    :target="target"
    theme="dropdown"
    transition="tw-tooltip-transition"
  >
    <slot name="content">Define #content</slot>
  </tw-popover>
</template>

<script lang="ts">
import { ref } from "vue"
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
    let target = ref<Node>()

    return {
      target,
      active,
    }
  },
}
</script>
