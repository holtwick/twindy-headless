<template>
  <div class="tw-object">
    <div v-if="isNull" class="-null">null</div>
    <div v-else-if="isNumber" class="-number">
      {{ value }}
    </div>
    <div v-else-if="isString" class="-string">"{{ value }}"</div>
    <div v-else-if="isTrue" class="-true">true</div>
    <div v-else-if="isFalse" class="-false">false</div>
    <div v-else-if="isDate" class="-date">
      {{ date }}
    </div>
    <div v-else-if="isArray">
      <div>[</div>
      <tw-object v-for="(v, i) in obj" :value="v" :key="i">
        <div v-if="i !== obj.length - 1" class="-comma">
          {{ ", " }}
        </div>
      </tw-object>
      <div>]</div>
    </div>
    <table v-else-if="isObject">
      <tr v-for="[k, v] of entries" :key="k">
        <th>
          <div class="-title">{{ k }}</div>
        </th>
        <td>
          <tw-object :value="v"></tw-object>
        </td>
      </tr>
    </table>
    <div v-else>{{ value.toString() }}</div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { cloneObject } from "./lib/clone"
import { defineComponent, PropType } from "vue"

export default defineComponent({
  props: {
    value: {
      type: Object as PropType<any>,
      default: null,
    },
  },
  computed: {
    obj(): any {
      return cloneObject(this.value)
    },
    entries() {
      if (this.isObject) {
        let entries = Object.entries(this.obj)
        entries.sort()
        return entries
      }
      return []
    },
    isArray(): boolean {
      return Array.isArray(this.obj)
    },
    isObject(): boolean {
      return !Array.isArray(this.obj) && typeof this.obj === "object"
    },
    isNull(): boolean {
      return this.value == null
    },
    isTrue(): boolean {
      return this.value === true
    },
    isFalse(): boolean {
      return this.value === false
    },
    isDate(): boolean {
      return this.obj instanceof Date
    },
    isNumber(): boolean {
      return typeof this.value === "number"
    },
    isString(): boolean {
      return typeof this.value === "string"
    },
  },
})
</script>
