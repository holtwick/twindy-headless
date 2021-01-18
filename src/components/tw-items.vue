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
      :class="{ '-selected': selected === index || selected === item._id }"
    >
      <slot :item="item" :index="index"> {{ index }}. {{ item }} </slot>
    </div>
    <slot name="empty" v-if="items.length <= 0">Empty</slot>
  </div>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    selected: {
      type: [String, Number],
      default: 0,
    },
  },
  methods: {
    doAction(item) {
      this.$emit("selected", item)
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
  },
})
</script>
