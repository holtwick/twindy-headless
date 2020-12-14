<!-- Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright -->

<template>
  <div class="form-group">
    <label :for="uid" class="form-label label-sm" v-if="label">
      {{ label }}
    </label>
    <div class="form-body">
      <slot v-bind:uid="uid"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { UUID } from "./lib/uuid"

export default defineComponent({
  name: "tw-form-group",
  props: {
    label: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      uid: UUID(),
    }
  },
})
</script>
