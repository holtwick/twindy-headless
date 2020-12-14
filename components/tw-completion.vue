<!-- Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright -->

<template>
  <div
    class="form-input completion"
    ref="$target"
    @click="$refs.$input.focus()"
    :class="{ '-focus': focus }"
  >
    <slot name="before"></slot>
    <input
      type="text"
      ref="$input"
      :id="uid"
      v-model="text"
      autocomplete="off"
      :placeholder="placeholder"
      @focus="focus = true"
      @blur="focus = false"
      @input="doInput"
      @keydown.down="doMove(+1)"
      @keydown.up="doMove(-1)"
      @keydown.enter="doAddSelection"
      @keydown.esc="doClear"
      @keydown.8="doDeleteLast"
      class="completion-input"
    />
    <div class="completion-after">
      <slot name="after" class="completion-after"></slot>
    </div>
    <tw-popover
      :target="items.length && focus && $refs.$target"
      placement="bottom-start"
      :arrow="false"
      theme="dropdown"
      :offset="[0, 2]"
    >
      <tw-items
        :items="items"
        :selected="selected"
        #default="{ item }"
        @selected="doAddItem"
      >
        <slot name="item" v-bind:item="item">
          {{ item }}
        </slot>
      </tw-items>
      <slot></slot>
    </tw-popover>
  </div>
</template>

<script>
import TwPopover from "./tw-popover.vue"
import TwItems from "./tw-items"

const log = require("debug")("ui:completion")

export default {
  name: "tw-completion",
  components: {
    TwItems,
    TwPopover,
  },
  props: {
    uid: {
      type: String,
      default: "",
    },
    items: {
      type: Array,
      default: [],
    },
    placeholder: {
      type: String,
      default: "",
    },
    minSize: {
      type: Number | String,
      default: 32,
    },
  },
  data() {
    return {
      selected: 0,
      text: "",
      itemCandidate: null,
      focus: false,
    }
  },
  watch: {
    text(value) {
      this.$emit("filter", value)
    },
  },
  mounted() {
    const input = this.$refs.$input
    input.style.width = `${+this.minSize}px`
  },
  methods: {
    resizeInput() {
      log("resize")
      const input = this.$refs.$input
      let value = input.value.trim()
      input.style.width = "1px"
      input.style.width =
        Math.max(+this.minSize, value ? input.scrollWidth : 0) + "px"
    },
    doInput(event) {
      this.resizeInput()
    },
    doClear() {
      this.text = ""
      this.$emit("filter", "")
    },
    doMove(delta) {
      this.selected = Math.max(
        0,
        Math.min(this.items.length - 1, this.selected + delta)
      )
    },
    doAddItem(item) {
      log("item", item.title)
      this.text = item.title
      this.$emit("add", item)
      this.doClear()
    },
    doAddSelection() {
      const item = this.items[this.selected]
      this.doAddItem(item)
    },
    doDeleteLast(ev) {
      if (this.text === "") {
        ev.preventDefault()
        this.$emit("deleteLast")
      }
    },
  },
}
</script>
