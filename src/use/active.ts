import { ref, Ref, watch } from "vue"

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

export function useActive(props: any): Ref<boolean> {
  let show = ref(Boolean(props?.active || props?.modelValue))

  watch(
    () => props?.active,
    () => {
      // console.log("useActive :active =", props?.active)
      show.value = props?.active
    }
  )

  watch(
    () => props?.modelValue,
    () => {
      // console.log("useActive v-model =", props?.modelValue)
      show.value = props?.modelValue
    }
  )

  return show
}
