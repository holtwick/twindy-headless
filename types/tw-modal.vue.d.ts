declare const _default: import("vue").DefineComponent<
  {
    modelValue: {
      type: (BooleanConstructor | ObjectConstructor)[]
      default: boolean
    }
    title: {
      type: StringConstructor
      default: string
    }
    close: {
      type: BooleanConstructor
      default: boolean
    }
    role: {
      default: string
    }
    canCancel: {
      type: BooleanConstructor
      default: boolean
    }
    onCancel: {
      type: FunctionConstructor
      default: () => void
    }
  },
  {
    root: import("vue").Ref<any>
    doCancel(): void
    doClose(): void
    doFocus(): void
    didAppear(): void
  },
  unknown,
  {},
  {},
  import("vue").ComponentOptionsMixin,
  import("vue").ComponentOptionsMixin,
  (
    | "close"
    | "update:modelValue"
    | "didOpen"
    | "willClose"
    | "didClose"
    | "cancel"
  )[],
  | "close"
  | "update:modelValue"
  | "didOpen"
  | "willClose"
  | "didClose"
  | "cancel",
  import("vue").VNodeProps &
    import("vue").AllowedComponentProps &
    import("vue").ComponentCustomProps,
  Readonly<
    {
      close: boolean
      modelValue: boolean
      title: string
      role: string
      canCancel: boolean
      onCancel: Function
    } & {}
  >,
  {
    close: boolean
    modelValue: boolean
    title: string
    role: string
    canCancel: boolean
    onCancel: Function
  }
>
export default _default
