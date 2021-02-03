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

<script>
import { cloneObject } from "./lib/clone"

export default {
  props: {
    value: {
      default: null,
    },
  },
  computed: {
    obj() {
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
    isArray() {
      return Array.isArray(this.obj)
    },
    isObject() {
      return !Array.isArray(this.obj) && typeof this.obj === "object"
    },
    isNull() {
      return this.value == null
    },
    isTrue() {
      return this.value === true
    },
    isFalse() {
      return this.value === false
    },
    isDate() {
      return this.obj instanceof Date
    },
    isNumber() {
      return typeof this.value === "number"
    },
    isString() {
      return typeof this.value === "string"
    },
  },
}
</script>
