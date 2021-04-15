<template>
  <div class="tw-notification-container">
    <transition-group name="tw-notification" tag="div">
      <div class="tw-notification" v-for="n in notifications" :key="n.id">
        <div class="tw-notification-header">
          <div class="tw-notification-title">{{ n.title }}</div>
          <div class="tw-notification-close"><slot name="close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </slot></div>
        </div>
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
