// Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright

export function getStyleCSS(elem) {
  let view = elem.ownerDocument.defaultView
  if (!view) {
    view = window
  }
  return view.getComputedStyle(elem)
}

export function getElementCSS(elem, name, toNumber = false) {
  let computed = getStyleCSS(elem)
  let val = computed.getPropertyValue(name) || computed[name]
  if (toNumber) {
    return parseFloat(val)
  }
  return val
}

export function getElementCSSValue(elem, name) {
  return getElementCSS(elem, name, true)
}

export function getElementOffset(elem) {
  if (!elem.getClientRects().length) {
    return { top: 0, left: 0 }
  }
  let rect = elem.getBoundingClientRect()
  let win = elem.ownerDocument.defaultView
  return {
    top: rect.top + win.pageYOffset,
    left: rect.left + win.pageXOffset,
  }
}

export function getElementPosition(elem) {
  let offsetParent,
    offset,
    doc,
    parentOffset = { top: 0, left: 0 }
  let { width, height } = elem.getBoundingClientRect()
  if (getElementCSS(elem, "position") === "fixed") {
    offset = elem.getBoundingClientRect()
  } else {
    offset = getElementOffset(elem)
    doc = elem.ownerDocument
    offsetParent = elem.offsetParent || doc.documentElement
    while (
      offsetParent &&
      (offsetParent === doc.body || offsetParent === doc.documentElement) &&
      getElementCSS(offsetParent, "position") === "static"
    ) {
      offsetParent = offsetParent.parentNode
    }
    if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
      parentOffset = getElementOffset(offsetParent)
      parentOffset.top += getElementCSS(offsetParent, "borderTopWidth", true)
      parentOffset.left += getElementCSS(offsetParent, "borderLeftWidth", true)
    }
  }

  let top =
    offset.top - parentOffset.top - getElementCSS(elem, "marginTop", true)
  let left =
    offset.left - parentOffset.left - getElementCSS(elem, "marginLeft", true)

  let bottom = top + height
  let right = left + width

  return {
    top,
    left,
    width,
    height,
    bottom,
    right,
    offsetTop: parentOffset.top,
    offsetLeft: parentOffset.left,
  }
}
