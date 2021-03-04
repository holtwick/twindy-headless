import { ref, watch } from "vue"

/*
props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
*/

export function useActive(props: any) {
  let show = ref(false)

  watch(
    () => props.active,
    () => {
      show.value = props.active
    }
  )

  watch(
    () => props.modelValue,
    () => {
      show.value = props.modelValue
    }
  )

  return show
}
