// Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright

const log = require("debug")("ui:trapFocus")

const findFocusable = (element) => {
  if (!element) {
    return null
  }
  return element.querySelectorAll(
    `
    a[href],
    area[href],
    input:not([disabled]),
    select:not([disabled]),
    textarea:not([disabled]),
    button:not([disabled]),
    iframe,
    object,
    embed,
    *[tabindex],
    *[contenteditable]
    `.trim()
  )
  //     .tw-button,
  //     .tw-link,
}

let onKeyDown

const bind = (el, { value = true }) => {
  if (value && el) {
    onKeyDown = (event) => {
      log("trapped")
      const focusable: HTMLElement[] = Array.from(findFocusable(el))
      let currentFocus = document.querySelector(":focus")
      let index = focusable.findIndex((f: Node) => f.isSameNode(currentFocus))
      let length = focusable.length
      log("dic", focusable, currentFocus, index)

      if (event.key === "Tab") {
        event.preventDefault()
        if (!event.shiftKey) {
          ++index
          if (index >= length) index = 0
        } else {
          --index
          if (index <= 0) index = length - 1
        }
        log("index", index, length)
        focusable[index].focus()
      }
    }
    el.addEventListener("keydown", onKeyDown)
  }
}

const unbind = (el) => {
  el?.removeEventListener("keydown", onKeyDown)
}

const directive = {
  beforeMount: bind,
  unMount: unbind,
}

export default directive
