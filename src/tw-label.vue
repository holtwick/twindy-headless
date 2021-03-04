<!-- Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright -->

<template>
  <div class="form-group" v-bind="$attrs">
    <label :for="id" class="form-label" v-if="label">
      {{ label }}
    </label>
    <div class="form-body">
      <slot v-bind="id"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { UUID } from "./lib/uuid"

export default {
  props: {
    label: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      id: UUID(),
    }
  },
}
</script>
