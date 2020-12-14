<!-- Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright -->

<template>
  <div
    class="tw-switch-container"
    :class="{ '-inline': !slotted, 'form-group': slotted }"
  >
    <label :for="uid" class="tw-switch" :class="`-${theme}`" ref="labelSwitch">
      <tw-input-base :uid="uid" v-bind="$attrs" type="switch" />
      <i></i>
      <span class="tw-switch-label" v-if="slotted">
        {{ label }}
        <slot></slot>
      </span>
    </label>
  </div>
</template>

<script lang="ts">
// Mix of this receipt: https://www.cssscript.com/realistic-ios-switch-pure-css/
// And IBM Carbon: https://www.carbondesignsystem.com/components/toggle/code

import { defineComponent } from "vue"
import { UUID } from "./lib/uuid"
import TwFormGroup from "./tw-form-group.vue"
import TwInputBase from "./tw-input-base.vue"

export default defineComponent({
  name: "tw-switch",
  components: {
    TwFormGroup,
    TwInputBase,
  },
  props: {
    label: {
      type: String,
      default: "",
    },
    theme: {
      type: String,
      default: "primary",
    },
  },
  computed: {
    slotted() {
      return this.label || this.$slots?.default?.[0] != null
    },
  },
  data() {
    return {
      uid: UUID(),
    }
  },
})
</script>
