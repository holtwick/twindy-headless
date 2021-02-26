declare const directive: {
  beforeMount: (
    el: any,
    {
      value,
    }: {
      value?: boolean
    }
  ) => void
  unMount: (el: any) => void
}
export default directive
