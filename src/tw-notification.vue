<template>
  <div class="tw-notification-container">
    <transition-group name="tw-notification" tag="div">
      <div class="tw-notification" v-for="n in notifications" :key="n.id">
        <div class="tw-notification-title">{{ n.title }}</div>
        <div class="tw-notification-message">{{ n.message }}</div>
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { notifications } from "./state"

export default defineComponent({
  setup() {
    return {
      notifications,
    }
  },
})
</script>
