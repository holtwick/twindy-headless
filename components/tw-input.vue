<!-- Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright -->

<template>
  <tw-form-group v-bind="$attrs" #default="{ uid }">
    <tw-input-base
      v-if="resize || multiline"
      class="form-input-autoresize"
      ref="textarea"
      :uid="uid"
      v-bind="$attrs"
      :rows="rows"
      type="textarea"
      @input="onInput"
      @keydown.enter="onEnter"
      @focus="onFocus"
    />
    <tw-input-base
      v-else
      :uid="uid"
      ref="textarea"
      v-bind="$attrs"
      type="input"
      @input="$emit('update:modelValue', $event)"
      @keydown.enter="onEnter"
      @focus="onFocus"
    />
    <tw-link
      class="tw-input-paste"
      @click="doCopy"
      symbol="doc_on_clipboard"
      tooltip="Copy content to clipboard"
    />
  </tw-form-group>
</template>

<script>
import TwFormGroup from "./tw-form-group"
import TwInputBase from "./tw-input-base"
import TwLink from "./tw-link"

export default {
  name: "tw-input",
  components: {
    TwLink,
    TwFormGroup,
    TwInputBase,
  },
  props: {
    resize: {
      default: false,
      type: Boolean,
    },
    multiline: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      rows: this.resize ? 1 : 4,
      textarea: null,
      resizeObserver: null,
    }
  },
  mounted() {
    if (this.resize) {
      let el = this.$refs.textarea.$el
      el.setAttribute(
        "style",
        "height:" + (el.scrollHeight + 2) + "px;overflow-y:hidden;resize:none;"
      )
      this.resizeObserver = new ResizeObserver(() => this.onResizeTextarea())
      this.resizeObserver.observe(el)
    }
  },
  beforeUnmount() {
    if (this.resize) {
      this.resizeObserver.disconnect()
      this.resizeObserver = null
    }
  },
  emits: ["update:modelValue"],
  methods: {
    onInput(ev) {
      this.onResizeTextarea()
      this.$emit("update:modelValue", ev)
    },
    onResizeTextarea() {
      if (this.resize) {
        let el = this.$refs.textarea.$el
        el.style.height = "auto"
        el.style.height = el.scrollHeight + 2 + "px"
      }
    },
    onEnter(event) {
      if (!this.multiline) {
        let el = event.target
        el.setSelectionRange(0, el.value.length)
        event.preventDefault()
      }
      this.$emit("action", event)
    },
    onFocus() {
      this.$refs?.textarea?.$el?.select()
      // this.$refs?.input?.$el?.select()
    },
    doCopy() {
      let value = this.$refs?.textarea?.$el?.value
      $op.copyToClipboard(value)
    },
  },
}
</script>
