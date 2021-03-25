<template>
  <button
    v-bind="$attrs"
    :disabled="disabled"
    :role="role"
    :tabindex="disabled ? '0' : undefined"
    @mousedown="doBeforeClick"
    @click="doClick"
    @contextmenu="doClick"
  >
    <tw-icon v-if="icon" :name="icon" />
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
import twSymbol from "./tw-symbol.vue"
import twIcon from "./tw-icon.vue"
import { defineComponent } from "vue"

export default defineComponent({
  components: {
    twSymbol,
    twIcon,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    theme: {
      default: "primary",
    },
    icon: {
      type: String,
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
