<template>
  <div class="app">
    <div>
      <tw-button @action="openDialog">Open dialog</tw-button>
    </div>
    <div>
      <tw-switch>Switches</tw-switch>
    </div>
    <div>
      Test
      <tw-select>
        <option value="">AAA</option>
        <option value="1">BBB</option>
      </tw-select>
    </div>
  </div>
  <tw-modal :active="modal" :title="TEST"> XXX</tw-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { twButton, twModal, twSelect, twSwitch } from "../components"

export default defineComponent({
  name: "App",
  components: {
    twButton,
    twModal,
    twSelect,
    twSwitch,
  },
  setup() {
    let modal = ref()
    return {
      modal,
      openDialog() {
        modal.value = true
      },
    }
  },
})
</script>
