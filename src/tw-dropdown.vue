<!-- Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright -->

<template>
  <div
    ref="target"
    style="display: inline-block"
    @click.stop="active = !active"
  >
    <slot class="tw-dropdown"></slot>
  </div>
  <tw-popover
    :arrow="false"
    v-model="active"
    :target="target"
    theme="dropdown"
    transition="tw-tooltip-transition"
    :offset="() => [0, 4]"
    placement="bottom-start"
    ><div><slot name="content">Define #content</slot></div></tw-popover
  >
</template>

<script lang="ts">
import { ref, defineComponent } from "vue"
import twPopover from "./tw-popover.vue"

export default defineComponent({
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

  setup() {
    let active = ref<boolean>(false)
    let target = ref<HTMLElement>()

    return {
      target,
      active,
    }
  },
})
</script>
