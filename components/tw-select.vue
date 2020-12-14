<!-- Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright -->

<template>
  <tw-form-group v-bind="$attrs" #default="{ uid }">
    <tw-input-base
      :uid="uid"
      v-bind="$attrs"
      v-on="$listeners"
      type="select"
      @input="$emit('input', $event)"
    >
      <slot></slot>
    </tw-input-base>
  </tw-form-group>
</template>

<script lang="ts">
import TwInputBase from "./tw-input-base.vue"
import TwFormGroup from "./tw-form-group.vue"
import { defineComponent } from "vue"

export default defineComponent({
  name: "tw-select",
  components: {
    TwFormGroup,
    TwInputBase,
  },
})
</script>
