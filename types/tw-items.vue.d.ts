declare const _default: import("vue").DefineComponent<
  {
    items: {
      type: ArrayConstructor
      default: () => any[]
    }
    selected: {
      type: (StringConstructor | NumberConstructor)[]
      default: number
    }
  },
  {
    doAction(item: any): void
  },
  unknown,
  {},
  {},
  import("vue").ComponentOptionsMixin,
  import("vue").ComponentOptionsMixin,
  "selected"[],
  "selected",
  import("vue").VNodeProps &
    import("vue").AllowedComponentProps &
    import("vue").ComponentCustomProps,
  Readonly<
    {
      selected: string | number
      items: unknown[]
    } & {}
  >,
  {
    selected: string | number
    items: unknown[]
  }
>
export default _default
