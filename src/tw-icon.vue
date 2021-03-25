<template>
  <svg v-if="name" preserveAspectRatio="xMinYMin">
    <use :xlink:href="`${base}assets/sprites.svg#${name}`"></use>
  </svg>
  <svg
    v-else
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <slot />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    name: {
      type: String,
      default: "",
    },
  },
  setup() {
    return {
      base: import.meta.env.BASE_URL,
    }
  },
})
</script>
