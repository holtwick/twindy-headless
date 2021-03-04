// Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright

/**
 * +/- function to native math sign
 */
function signPoly(value: number) {
  if (value < 0) return -1
  return value > 0 ? 1 : 0
}

export const sign = Math.sign || signPoly

/**
 * Get value of an object property/path even if it's nested
 */
export function getValueByPath(obj: any, path: string) {
  const value = path
    .split(".")
    .reduce(
      (o: { [x: string]: any }, i: string | number) => (o ? o[i] : null),
      obj
    )
  return value
}

/**
 * Extension of indexOf method by equality function if specified
 */
export function indexOf(
  array: string | any[],
  obj: any,
  fn: (arg0: any, arg1: any) => any
) {
  if (!array) return -1

  if (!fn || typeof fn !== "function") return array.indexOf(obj)

  for (let i = 0; i < array.length; i++) {
    if (fn(array[i], obj)) {
      return i
    }
  }

  return -1
}

/**
 * Merge function to replace Object.assign with deep merging possibility
 */
// const isObject = (item: any) => typeof item === "object" && !Array.isArray(item)
// const mergeFn = (
//   target: { [x: string]: any; hasOwnProperty: (arg0: any) => any },
//   source: { [x: string]: any },
//   deep = false
// ) => {
//   if (deep || !Object.assign) {
//     const isDeep = (prop: string) =>
//       isObject(source[prop]) &&
//       target !== null &&
//       target.hasOwnProperty(prop) &&
//       isObject(target[prop])
//     const replaced = Object.getOwnPropertyNames(source)
//       .map((prop) => ({
//         [prop]: isDeep(prop)
//           ? mergeFn(target[prop], source[prop], deep)
//           : source[prop],
//       }))
//       .reduce((a, b) => ({ ...a, ...b }), {})

//     return {
//       ...target,
//       ...replaced,
//     }
//   } else {
//     return Object.assign(target, source)
//   }
// }
// export const merge = mergeFn

/**
 * Mobile detection
 * https://www.abeautifulsite.net/detecting-mobile-devices-with-javascript
 */
export const isMobile = {
  Android: function () {
    return (
      typeof window !== "undefined" &&
      window.navigator.userAgent.match(/Android/i)
    )
  },
  BlackBerry: function () {
    return (
      typeof window !== "undefined" &&
      window.navigator.userAgent.match(/BlackBerry/i)
    )
  },
  iOS: function () {
    return (
      typeof window !== "undefined" &&
      window.navigator.userAgent.match(/iPhone|iPad|iPod/i)
    )
  },
  Opera: function () {
    return (
      typeof window !== "undefined" &&
      window.navigator.userAgent.match(/Opera Mini/i)
    )
  },
  Windows: function () {
    return (
      typeof window !== "undefined" &&
      window.navigator.userAgent.match(/IEMobile/i)
    )
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    )
  },
}

export function removeElement(el: {
  remove: () => void
  parentNode: { removeChild: (arg0: any) => void }
}) {
  if (typeof el.remove !== "undefined") {
    el.remove()
  } else if (typeof el.parentNode !== "undefined") {
    el.parentNode.removeChild(el)
  }
}

/**
 * Escape regex characters
 * http://stackoverflow.com/a/6969486
 */
export function escapeRegExpChars(value: string) {
  if (!value) return value

  // eslint-disable-next-line
  return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
}

const rxEscape = /[\-\[\]\/{}()*+?.^$|]/g

export function escapeRegExp(value: {
  source: any
  replace: (arg0: RegExp, arg1: string) => any
}) {
  if (!value) return ""
  if (value instanceof RegExp) {
    return value.source
  }
  return value.replace(rxEscape, "\\$&")
}

// https://github.com/viljamis/feature.js/blob/master/feature.js#L203
export const supportsTouch = Boolean(
  (window && "ontouchstart" in window) ||
    (navigator?.maxTouchPoints || 0) > 1 ||
    (navigator?.msPointerEnabled && window?.MSGesture) ||
    // @ts-ignore
    (window?.DocumentTouch && document instanceof DocumentTouch)
)
