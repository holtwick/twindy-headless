export function useFontLoaded(fontName: string, action: Function) {
  // @ts-ignore
  if (document?.fonts) {
    setTimeout(() => {
      // @ts-ignore
      document.fonts.load('16px "' + fontName + '"').then(() => {
        console.log("Font loaded", fontName)
        action()
      })
    }, 0)
  }
}
