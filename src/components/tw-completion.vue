<!-- Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright -->

<template>
  <div
    class="tw-completion"
    ref="target"
    @click="input.focus()"
    :class="{ '-focus': focus }"
  >
    <slot name="before"></slot>
    <input
      xtype="text"
      ref="input"
      :id="uid"
      v-model="filterText"
      autocomplete="off"
      :placeholder="placeholder"
      @focus="focus = true"
      @blur="focus = false"
      @input="doInput"
      @keydown.down.prevent="doMove(+1)"
      @keydown.up.prevent="doMove(-1)"
      @keydown.enter="doAddSelection"
      @keydown.esc="doClear"
      @keydown.backspace="doDeleteLast"
      class="tw-completion-input"
    />
    <div class="tw-completion-after">
      <slot name="after" class="completion-after"></slot>
    </div>
    <tw-popover
      v-model="active"
      :target="target"
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

<script script="ts">
import twPopover from "./tw-popover.vue"
import twItems from "./tw-items.vue"
import { UUID } from "./lib/uuid.ts"
import { defineComponent, ref, reactive, toRefs, watch } from "vue"

export default defineComponent({
  components: {
    twItems,
    twPopover,
  },
  props: {
    // active: {
    //   default: true, // items.length && focus
    // },
    uid: {
      type: String,
      default: UUID(),
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
      type: [Number, String],
      default: 32,
    },
    filter: {
      type: String,
    },
  },
  computed: {
    active() {
      return this.items.length && this.focus
    },
  },
  emits: ["filter", "deleteLast", "add", "update:filter"],
  setup(props, { emit }) {
    let target = ref()
    let input = ref()
    let filterText = ref("")

    // mounted(() => {
    //   console.log("mounted")
    //   // input?.value?.style?.width = `${props.minSize}px`
    // })

    let data = reactive({
      selected: 0,
      itemCandidate: null,
      focus: false,
    })

    let methods = {
      resizeInput() {
        const el = input.value
        let value = el.value.trim()
        el.style.width = "1px"
        el.style.width =
          Math.max(+props.minSize, value ? el.scrollWidth : 0) + "px"
      },
      doInput(event) {
        methods.resizeInput()
      },
      doClear() {
        filterText.value = ""
        emit("filter", "")
      },
      doMove(delta) {
        data.selected = Math.max(
          0,
          Math.min(props.items.length - 1, data.selected + delta)
        )
      },
      doAddItem(item) {
        console.log("add item", item.title, filterText.value)
        emit("add", item)
        methods.doClear()
      },
      doAddSelection() {
        const item = props.items[this.selected]
        methods.doAddItem(item)
      },
      doDeleteLast(ev) {
        if (!filterText.value) {
          ev.preventDefault()
          emit("deleteLast")
        }
      },
    }

    filterText.value = props.filter

    watch(filterText, () => {
      emit("filter", filterText.value)
    })

    return {
      ...methods,
      ...toRefs(data),
      filterText,
      target,
      input,
    }
  },
})
</script>
