<!-- Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright -->

<template>
  <tw-popover :target="target">
    <div class="tw-menu">
      <template v-for="item in items">
        <a
          class="-item"
          v-if="item.title"
          @click.prevent.stop="doAction(item)"
          @contextmenu.prevent.stop="doAction(item)"
          :data-test-menu="item.title"
        >
          {{ item.title }}
        </a>
        <hr class="-separator" v-else />
      </template>
    </div>
  </tw-popover>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue"
import { TwindyMenuItem } from "./types"

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<TwindyMenuItem[]>,
      default: () => [],
    },
    target: {
      type: Object as PropType<HTMLElement>,
    },
  },
  data() {
    return {
      blocked: false,
    }
  },
  methods: {
    async doAction(item: TwindyMenuItem) {
      if (item && item.action) {
        item.action(item)
      }
    },
  },
})
</script>
