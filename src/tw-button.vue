<template>
  <button
    :class="class"
    @click.prevent="$emit('action'), $emit('click', $event)"
    :disabled="disabled"
  >
    <span v-if="right && (title || $slots.default)">{{ title }}<slot /></span>
    <tw-icon v-if="name || icon" :name="name || icon" />
    <tw-symbol v-if="symbol" :name="symbol" />
    <span v-if="!right && (title || $slots.default)">{{ title }}<slot /></span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import twIcon from "./tw-icon.vue"
import twSymbol from "./tw-symbol.vue"

/**
 * Features:
 *
 * - Supports `icon` (svg) and `symbol` (fonts)
 * - Image can go `left` or `right`
 * - Title can be passed via slot
 * - `@action` to have simple TS compatible event listeners
 */

export default defineComponent({
  components: {
    twIcon,
    twSymbol,
  },
  emits: ["action", "click"],
  props: {
    class: {
      type: String,
      default: "tw-button",
    },
    name: String,
    icon: String,
    symbol: String,
    right: Boolean,
    disabled: Boolean,
    title: String,
  },
})
</script>
