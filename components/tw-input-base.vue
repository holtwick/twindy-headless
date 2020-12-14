<!-- Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright -->

<template>
  <textarea
    v-if="type === 'textarea'"
    class="form-input"
    v-bind="$attrs"
    :id="uid"
    :placeholder="placeholder"
    :value="computedValue"
    @input="onInput"
    @change="$emit('action', computedValue)"
    v-text="value"
  />

  <select
    v-else-if="type === 'select'"
    class="form-select"
    v-bind="$attrs"
    :id="uid"
    :value="computedValue"
    @input="onInput"
    @change="$emit('action', computedValue)"
  >
    <option v-if="placeholder" value="" disabled hidden>
      {{ placeholder }}
    </option>
    <option v-for="o in options" :value="o" :key="o">{{ o }}</option>
    <slot></slot>
  </select>

  <input
    v-else-if="type === 'switch'"
    type="checkbox"
    v-bind="$attrs"
    :id="uid"
    :checked="computedValue"
    role="switch"
    @input="onInputBool"
    @change="$emit('action', computedValue)"
  />

  <input
    v-else-if="type === 'number'"
    type="number"
    autocomplete="off"
    class="form-input"
    v-bind="$attrs"
    :id="uid"
    :value="computedValue"
    @input="onInput"
    :placeholder="placeholder"
    @change="$emit('action', computedValue)"
  />

  <input
    v-else
    type="text"
    ref="$input"
    class="form-input"
    v-bind="$attrs"
    :id="uid"
    :value="computedValue"
    :placeholder="placeholder"
    autocomplete="off"
    @input="onInput"
    @keydown.enter.prevent=""
    @change="$emit('action', computedValue)"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "tw-input-base",
  inheritAttrs: false,
  emits: ["update:modelValue"],
  props: {
    label: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: "Text",
    },
    modelValue: {
      type: [String, Boolean, Number],
      default: "",
    },
    uid: {
      type: String,
      default: Math.random().toString(),
    },
    type: {
      type: String,
      // textarea, select, switch, number
    },
    options: {
      type: Array,
      default: () => [],
    },
    singleLine: {
      default: false,
    },
    grow: {
      default: false,
    },
  },
  data() {
    return {
      newValue: this.modelValue,
    }
  },
  computed: {
    computedValue: {
      get() {
        let dflt: string | boolean | number = ""
        if (this.type === "switch") dflt = false
        if (this.type === "select") dflt = 0
        if (this.type === "number") dflt = 0
        return this.newValue || dflt
      },
      set(value) {
        this.newValue = value
        this.$emit("update:modelValue", value)
        // !this.isValid && this.checkHtml5Validity()
      },
    },
  },
  watch: {
    value(value) {
      this.newValue = value
    },
  },
  methods: {
    resizeInput() {
      const minWidth = 32
      const input = this.$refs.$input
      let value = input.value.trim()
      input.style.width = "1px"
      input.style.width = (value ? input.scrollWidth : minWidth) + "px"
    },
    onInput(event) {
      if (this.grow) this.resizeInput()
      this.$nextTick(() => {
        if (event.target) {
          this.computedValue = event.target.value
        }
      })
    },
    onInputBool(event) {
      this.$nextTick(() => {
        if (event.target) {
          this.computedValue = event.target.checked
          event.target.focus()
        }
      })
    },
  },
})
</script>
