<!-- Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright -->

<template>
  <button
    :class="classnames"
    v-bind="$attrs"
    :disabled="disabled"
    :role="role"
    @mousedown="doBeforeClick"
    @click="doClick"
    @contextmenu="doClick"
  >
    <tw-symbol
      v-if="symbol || symbolLeft"
      :name="symbol || symbolLeft"
      class="tw-button-symbol-left"
    />
    {{ title }}
    <slot></slot>
    <tw-symbol
      v-if="symbolRight"
      :name="symbolRight"
      class="tw-button-symbol-right"
    />
  </button>
</template>

<script lang="ts">
import TwSymbol from "./tw-symbol.vue"
import { defineComponent } from "vue"

// @action, @click

export default defineComponent({
  name: "tw-button",
  components: { TwSymbol },
  props: {
    title: {
      type: String,
      default: "",
    },
    theme: {
      default: "primary",
    },
    symbol: {
      type: String,
    },
    symbolLeft: {
      type: String,
    },
    symbolRight: {
      type: String,
    },
    role: {
      type: String,
      default: "button",
      validator(value: string) {
        return ["button", "link"].includes(value)
      },
    },
    active: {
      // active state for selections
      type: Boolean,
      default: false,
    },
    passive: {
      // do not loose focus
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      disabled: false,
      tooltipInstance: null,
      hoverCount: 0,
    }
  },
  computed: {
    slotted() {
      return this.title || this.$slots?.default?.[0] != null
    },
    classnames() {
      return {
        [`tw-${this.role}`]: true,
        [`-${this.theme}`]: true,
        "-active": this.active === true,
        "-has-title": this.slotted,
      }
    },
  },
  emits: ["click", "action", "update:active"],
  methods: {
    async doAction(ev) {
      // this.hideTooltip()
      if (this.disabled) return
      this.disabled = true
      try {
        // ev.waitUntil = async () => null
        await this.$nextTick()
        this.$emit("click", ev)
        this.$emit("action", ev)
        this.$emit("update:active", !this.active)
        if (ev.waitUntil) {
          await ev.waitUntil
        }
      } catch (err) {
        // trackException(err)
      }
      this.disabled = false
    },
    async doClick(ev) {
      if (!this.passive) {
        await this.doAction(ev)
      }
    },
    async doBeforeClick(ev) {
      if (this.passive) {
        ev.preventDefault()
        await this.doAction(ev)
      }
    },
  },
})
</script>
