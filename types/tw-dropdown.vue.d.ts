declare const _default: {
  components: {
    twPopover: import("vue").DefineComponent<
      {},
      {},
      any,
      import("vue").ComputedOptions,
      import("vue").MethodOptions,
      import("vue").ComponentOptionsMixin,
      import("vue").ComponentOptionsMixin,
      Record<string, any>,
      string,
      import("vue").VNodeProps &
        import("vue").AllowedComponentProps &
        import("vue").ComponentCustomProps,
      Readonly<{} & {}>,
      {}
    >
  }
  props: {
    title: {
      type: StringConstructor
      default: string
    }
  }
  setup(
    props: any
  ): {
    target: import("vue").Ref<any>
    active: import("vue").Ref<boolean>
  }
}
export default _default
