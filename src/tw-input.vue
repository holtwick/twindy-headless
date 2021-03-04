<template>
  <input type="text" v-bind="$attrs" :placeholder="placeholder" ref="input" />
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref } from "vue"
import { onStartTyping } from "@vueuse/core"

export default defineComponent({
  props: {
    resize: {
      type: Boolean,
      default: false,
    },
    typing: {
      type: Boolean,
      default: false,
    },
    minSize: {
      type: [Number, String],
      default: 32,
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    let input = ref()

    let placeholderWidth = 0

    if (props.typing) {
      onStartTyping(() => {
        if (!input?.value?.active) {
          input.value.focus()
        }
      })
    }

    if (props.resize) {
      let resizeInput = () => {
        const el = input.value
        let value = el.value
        el.style.width = "1px"
        if (value === "" && placeholderWidth) {
          el.style.width = Math.max(+props.minSize, placeholderWidth) + "px"
        } else {
          el.style.width =
            Math.max(+props.minSize, value ? el.scrollWidth : 0) + "px"
        }
      }
      onMounted(() => {
        let el = input.value
        el.addEventListener("input", resizeInput)
        // console.log(props.placeholder)
        if (el.value === "" && props.placeholder?.length > 0) {
          el.style.width = "1px"
          el.value = props.placeholder
          placeholderWidth = el.scrollWidth
          // console.log(placeholderWidth)
          el.value = ""
        }
        resizeInput()
      })
      onBeforeUnmount(() => {
        input.value.removeEventListener("input", resizeInput)
      })
    }
    return {
      input,
    }
  },
})
</script>
