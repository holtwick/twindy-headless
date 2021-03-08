<!-- Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright -->

<template>
  <div class="tw-items" ref="$container">
    <div
      v-for="(item, index) in items"
      :key="item.id"
      :data-id="item.id"
      :data-index="index"
      @mousedown="doAction(item)"
      @keydown.enter="doAction(item)"
      class="tw-items-item"
      :class="{ '-selected': selected === index || selected === item.id }"
    >
      <slot :item="item" :index="index"> {{ index }}. {{ item }} </slot>
    </div>
    <slot name="empty" v-if="items.length <= 0">Empty</slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import { TwindyMenuItem } from "./types"

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<TwindyMenuItem[]>,
      default: () => [],
    },
    selected: {
      type: [String, Number],
      default: 0,
    },
  },
  emits: ["selected"],
  setup(props, { emit }) {
    let methods = {
      doAction(item: any) {
        // console.log("item selected", item)
        emit("selected", item)
      },
    }
    return {
      ...methods,
    }
  },
  // watch(() => props.selected, selected => {
  //   const divItem = state.$container.querySelector(`[data-id="${state.selected}"],[data-index="${state.selected}"]`)
  //   if (divItem) {
  //     divItem.scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'nearest',
  //       inline: 'nearest'
  //     })
  //   }
  // })
})
</script>
