<template>
  <teleport to="body">
    <template v-for="n in notifications" :key="n.id">
      <div class="notification">
        <div class="notification-title">{{ title }}</div>
        <div class="notification-message">{{ message }}</div>
      </div>
    </template>
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
