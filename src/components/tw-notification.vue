<template>
  <teleport to="body">
    <div class="notification-container">
      <template v-for="n in notifications" :key="n.id">
        <div class="notification">
          <div class="notification-title">{{ n.title }}</div>
          <div class="notification-message">{{ n.message }}</div>
        </div>
      </template>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue"
import { notifications, TwindyNotification } from "./notification"

export default defineComponent({
  props: {
    notifications: {
      type: Array as PropType<TwindyNotification[]>,
      default: notifications,
    },
  },
  setup(props) {
    let input = ref()

    return {}
  },
})
</script>
