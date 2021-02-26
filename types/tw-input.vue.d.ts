declare const _default: import("vue").DefineComponent<
  {
    resize: {
      type: BooleanConstructor
      default: boolean
    }
    typing: {
      type: BooleanConstructor
      default: boolean
    }
    minSize: {
      type: (NumberConstructor | StringConstructor)[]
      default: number
    }
    placeholder: {
      type: StringConstructor
      default: string
    }
  },
  {
    input: import("vue").Ref<any>
  },
  unknown,
  {},
  {},
  import("vue").ComponentOptionsMixin,
  import("vue").ComponentOptionsMixin,
  Record<string, any>,
  string,
  import("vue").VNodeProps &
    import("vue").AllowedComponentProps &
    import("vue").ComponentCustomProps,
  Readonly<
    {
      resize: boolean
      typing: boolean
      minSize: string | number
      placeholder: string
    } & {}
  >,
  {
    resize: boolean
    typing: boolean
    minSize: string | number
    placeholder: string
  }
>
export default _default
