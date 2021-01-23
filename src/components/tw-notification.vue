<template>
  <teleport to="body">
    <div class="notification-container">
      <transition-group name="notification" tag="div">
        <div class="notification" v-for="n in notifications" :key="n.id">
          <div class="notification-title">{{ n.title }}</div>
          <div class="notification-message">{{ n.message }}</div>
        </div>
      </transition-group>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from "vue"
import { notifications, TwindyNotification } from "./notification"

export default defineComponent({
  setup(props) {
    return {
      notifications,
    }
  },
})
</script>
