<!-- Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright -->

<template>
  <tw-button role="link" v-bind="$attrs">
    <slot></slot>
  </tw-button>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import TwButton from "./tw-button.vue"

export default defineComponent({
  components: {
    TwButton,
  },
})
</script>
