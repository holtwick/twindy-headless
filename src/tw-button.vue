<template>
  <button class="tc-button" v-bind="$attrs" :disabled="disabled">
    <slot v-if="left" />
    <tw-icon v-if="name || icon" :name="name || icon" />
    <tw-symbol v-if="symbol" :name="symbol" />
    <slot v-if="!left" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import twIcon from "./tw-icon.vue"
import twSymbol from "./tw-symbol.vue"

export default defineComponent({
  components: {
    twIcon,
    twSymbol,
  },
  props: {
    name: String,
    icon: String,
    symbol: String,
    left: Boolean,
    disabled: Boolean,
  },
})
</script>
