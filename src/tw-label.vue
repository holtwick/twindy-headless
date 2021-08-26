<!-- Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright -->

<template>
  <div class="form-group">
    <label :for="id" class="form-label" v-if="label">
      {{ label }}
    </label>
    <div class="form-body">
      <slot v-bind="{ id }"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { uname } from "zeed"

export default defineComponent({
  props: {
    label: {
      type: String,
      default: null,
    },
  },
  setup() {
    return {
      id: uname("tw-label"),
    }
  },
})
</script>
