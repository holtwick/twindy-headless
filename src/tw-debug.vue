<template>
  <div class="tw-debug">
    <null-wrapper
      v-if="objectToString(data) === 'Null'"
      :name="name"
      :data="data"
    ></null-wrapper>

    <boolean-wrapper
      v-else-if="objectToString(data) === 'Boolean'"
      :name="name"
      :data="data"
    ></boolean-wrapper>

    <number-wrapper
      v-else-if="objectToString(data) === 'Number'"
      :name="name"
      :data="data"
    ></number-wrapper>

    <string-wrapper
      v-else-if="objectToString(data) === 'String'"
      :name="name"
      :data="data"
    ></string-wrapper>

    <array-wrapper
      v-else-if="objectToString(data) === 'Array'"
      :name="name"
      :path="path"
      :data="data"
      :collapse-signal="collapseSignal"
      :expand-signal="expandSignal"
      :expandOnCreatedAndUpdated="expandOnCreatedAndUpdated"
      :getKeys="getKeys"
    ></array-wrapper>

    <object-wrapper
      v-else-if="objectToString(data) === 'Object'"
      :name="name"
      :path="path"
      :data="data"
      :collapse-signal="collapseSignal"
      :expand-signal="expandSignal"
      :expandOnCreatedAndUpdated="expandOnCreatedAndUpdated"
      :getKeys="getKeys"
    ></object-wrapper>
  </div>
</template>

<style src="./debug/index.css"></style>

<script>
import NullWrapper from "./debug/NullWrapper.vue"
import BooleanWrapper from "./debug/BooleanWrapper.vue"
import NumberWrapper from "./debug/NumberWrapper.vue"
import StringWrapper from "./debug/StringWrapper.vue"
import ArrayWrapper from "./debug/ArrayWrapper.vue"
import ObjectWrapper from "./debug/ObjectWrapper.vue"
import { objectToString } from "./debug/util"

const Wrapper = {
  props: {
    path: {
      default: [],
      validator(path) {
        return (
          objectToString(path) === "Array" &&
          path.every(
            (key) =>
              objectToString(key) === "String" ||
              objectToString(key) === "Number"
          )
        )
      },
    },
    data: {
      required: true,
      validator(data) {
        return (
          objectToString(data) === "Null" ||
          objectToString(data) === "Boolean" ||
          objectToString(data) === "Number" ||
          objectToString(data) === "String" ||
          objectToString(data) === "Array" ||
          objectToString(data) === "Object"
        )
      },
    },
    name: {
      type: String,
      default: "",
    },
    collapseSignal: {
      default: false,
      type: Boolean,
    },
    expandSignal: {
      default: false,
      type: Boolean,
    },
    level: {
      default: 1,
      type: Number,
    },
    getKeys: {
      type: Function,
      default: (object, path) => {
        let keys = Object.keys(object)
        keys.sort()
        return keys
      },
    },
  },
  computed: {
    expandOnCreatedAndUpdated() {
      return (path) => path.length < this.level
    },
  },
  setup() {
    return {
      objectToString,
    }
  },
  components: {
    NullWrapper,
    BooleanWrapper,
    NumberWrapper,
    StringWrapper,
    ArrayWrapper,
    ObjectWrapper,
  },
}

ArrayWrapper.components.Wrapper = Wrapper
ObjectWrapper.components.Wrapper = Wrapper

export default Wrapper
</script>
