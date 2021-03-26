<template>
  <button
    class="tw-button"
    @click="$emit('action')"
    v-bind="$attrs"
    :disabled="disabled"
  >
    <span v-if="left"><slot /></span>
    <tw-icon v-if="name || icon" :name="name || icon" />
    <tw-symbol v-if="symbol" :name="symbol" />
    <span v-if="!left"><slot /></span>
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
  emits: ["action"],
  props: {
    name: String,
    icon: String,
    symbol: String,
    left: Boolean,
    disabled: Boolean,
  },
})
</script>
