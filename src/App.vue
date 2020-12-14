<template>
  <div class="app">
    <div>
      <tw-button @action="openDialog">Open dialog</tw-button>
    </div>
    <div>
      <tw-switch v-model="modal">Switches</tw-switch>
      <input type="checkbox" v-model="modal" class="tw-checkbox" />
    </div>
    <div>
      Test {{ modal }}
      <tw-select>
        <option value="">AAA</option>
        <option value="1">BBB</option>
      </tw-select>
    </div>
  </div>
  <tw-modal v-model="modal" title="WebDAV Sync" close>
    <template #footer>
      <tw-button :disabled="!url">Connect</tw-button>
    </template>
  </tw-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRef, toRefs } from "vue"
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
    let state = reactive({
      modal: false,
    })
    return {
      ...toRefs(state),
      openDialog() {
        state.modal = true
      },
    }
  },
})
</script>
