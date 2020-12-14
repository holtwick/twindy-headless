<!-- Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright -->

<template>
  <div class="tw-items -scrollable" ref="$container">
    <div
      v-for="(item, index) in items"
      :key="item._id"
      :data-id="item._id"
      :data-index="index"
      @mousedown="doAction(item)"
      @keydown.enter="doAction(item)"
      class="tw-items-item"
      :class="{ '-selected': selected === index || selected === item._id }"
    >
      <slot v-bind:item="item">
        {{ item }}
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "tw-items",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    selected: {
      type: String | Number,
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
}
</script>
