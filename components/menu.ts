// Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright

import { createPopper } from "@popperjs/core"
import Vue from "vue"
import Menu from "./tw-menu.vue"

let vm = null
let el = null
let popper = null

export function showContextMenu(opt = {}) {
  if (!vm) {
    const component = Vue.extend(Menu)
    el = document.createElement("div")
    document.body.appendChild(el)
    vm = new component({
      el,
    })
  }

  window.addEventListener("mousedown", (evt) => {
    vm.$props.show = false
    // if (popper) {
    //   popper.destroy()
    //   popper = null
    // }
  })

  // vm.$props.top = opt.top
  // vm.$props.left = opt.left
  vm.$props.items = opt.items

  function generateGetBoundingClientRect(x = 0, y = 0) {
    return () => ({
      width: 0,
      height: 0,
      top: y,
      right: x,
      bottom: y,
      left: x,
    })
  }

  let virtualElement
  let { clientX: x, clientY: y, target } = opt?.event
  if (x == null) {
    virtualElement = target || opt?.target
  } else {
    virtualElement = {
      getBoundingClientRect: generateGetBoundingClientRect(x, y),
    }
  }

  vm.$nextTick(() => {
    popper = createPopper(
      virtualElement, // opt.event.target,
      vm.$el,
      {
        placement: "right-start",
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [-8, 2],
            },
          },
          {
            name: "preventOverflow",
            options: {
              // escapeWithReference: true,
              boundariesElement: "window",
              padding: 8,
            },
          },
        ],
      }
    )
    vm.$props.show = true
  })

  if (opt.event) {
    opt.event.preventDefault()
  }
}

export const MenuProgrammatic = {
  show: showContextMenu,
}
