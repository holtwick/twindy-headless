<!-- Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright -->

<template>
  <tw-form-group v-bind="$attrs" #default="{ uid }">
    <tw-input-base
      :uid="uid"
      v-bind="$attrs"
      type="number"
      @input="$emit('update:modelValue', $event)"
    />
  </tw-form-group>
</template>

<script>
import TwInputBase from "./tw-input-base"
import TwFormGroup from "./tw-form-group"

export default {
  name: "tw-number",
  components: {
    TwFormGroup,
    TwInputBase,
  },
  emits: ["update:modelValue"],
}
</script>
