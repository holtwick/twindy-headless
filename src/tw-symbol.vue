<!-- Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright -->

<template>
  <i class="f7" :data-f7-icon="name" aria-hidden="true" />
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    name: {
      type: String,
      default: 0,
      required: true,
    },
  },
})
</script>
