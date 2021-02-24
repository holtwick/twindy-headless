<!-- Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright -->

<template>
  <div class="tw-menu vstack" :style="getStyle">
    <template v-for="item in items">
      <a
        class="-item"
        v-if="item.title"
        @click.prevent.stop="doAction(item)"
        @contextmenu.prevent.stop="doAction(item)"
        >{{ item.title }}
      </a>
      <hr class="-separator" v-else />
    </template>
  </div>
</template>

<script lang="ts">
export default {
  props: { items: {}, top: { type: Number }, left: { type: Number } },
  computed: {
    getStyle() {
      return (
        "left:" + (this.left || 0) + "px;" + "top:" + (this.top || 0) + "px;"
      )
    },
  },
  data() {
    return {
      blocked: false,
    }
  },
  methods: {
    async doAction(item) {
      if (item && item.action && !this.blocked) {
        this.blocked = true
        item.action()
        await this.$nextTick()
        this.show = false
        this.blocked = false
      }
    },
  },
}
</script>
