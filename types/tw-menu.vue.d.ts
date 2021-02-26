declare const _default: {
  props: {
    items: {
      type: ArrayConstructor
    }
    target: {
      type: {
        new (): Element
        prototype: Element
      }
    }
  }
  data(): {
    blocked: boolean
  }
  methods: {
    doAction(item: any): Promise<void>
  }
}
export default _default
