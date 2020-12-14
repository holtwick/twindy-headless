<!-- Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright -->

<template>
  <tw-modal active standalone :close="false" :title="title">
    {{ message }}
    <tw-input-base
      v-model="value"
      class="dialog-input"
      v-if="hasInput"
      ref="input"
      :placeholder="placeholder"
      @keydown.enter="doConfirm"
      tabindex="0"
    />
    <template #footer>
      <tw-button
        @click="doCancel"
        ref="cancel"
        v-if="hasChoice || hasInput"
        class="-secondary"
        >{{ cancel }}</tw-button
      >
      <tw-button
        @click="doConfirm"
        ref="ok"
        :disabled="hasInput && !value"
        :theme="doneTheme"
        >{{ done }}</tw-button
      >
    </template>
  </tw-modal>
</template>

<script>
import TwButton from "./tw-button"
import TwInputBase from "./tw-input-base"
import TwModal from "./tw-modal"

export default {
  name: "tw-dialog",
  components: {
    TwInputBase,
    TwButton,
    TwModal,
  },
  extends: TwModal,
  props: {
    hasChoice: {
      default: false,
    },
    hasInput: {
      default: false,
    },
    message: {
      type: String,
    },
    value: {
      type: String,
    },
    title: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    done: {
      default: "OK",
    },
    doneTheme: {
      default: "primary",
    },
    cancel: {
      default: "Cancel",
    },
    onConfirm: {
      type: Function,
      default: (v) => {
        log("onConfirm not defined")
      },
    },
  },
  methods: {
    doConfirm() {
      this.onConfirm(this.value)
      this.doClose()
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.hasInput) {
        this.$refs.input.$el.focus()
        // } else if (this.hasChoice) {
        //   this.$refs.cancel.$el.focus()
      } else {
        this.$refs.ok.$el.focus()
      }
    })
  },
}
</script>
