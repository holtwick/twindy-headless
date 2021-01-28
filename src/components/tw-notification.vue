<template>
  <teleport to="body">
    <div class="tw-notification-container">
      <transition-group name="notification" tag="div">
        <div class="tw-notification" v-for="n in notifications" :key="n.id">
          <div class="tw-notification-title">{{ n.title }}</div>
          <div class="tw-notification-message">{{ n.message }}</div>
        </div>
      </transition-group>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { notifications } from "./state"

export default defineComponent({
  setup(props) {
    return {
      notifications,
    }
  },
})
</script>
