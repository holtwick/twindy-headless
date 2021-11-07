<template>
  <svg v-if="name" preserveAspectRatio="xMinYMin">
    <use :xlink:href="url"></use>
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
import { twIconUrl } from "./state"
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    name: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    return {
      url: `${twIconUrl ?? `${import.meta.env.BASE_URL}assets/sprites.svg`}#${
        props.name
      }`,
    }
  },
})

/*

Create a file in `public/assets/sprites.svg` which looks like this:

<svg xmlns="http://www.w3.org/2000/svg">

  <!-- When adding new entries, please remove the following propertiers, such it can be set via CSS: -->
  <!-- stroke-width, width, height, xmlns -->
  <!-- Add `id` for direct access -->

  <svg id="test" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <!-- ... -->
  </svg>
 
</svg>
*/
</script>
