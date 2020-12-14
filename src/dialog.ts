// Copyright (c) 2020 Dirk Holtwick. All rights reserved. https://holtwick.de/copyright

import Vue from "vue"
import { merge } from "./lib/helpers"
import Dialog from "./tw-dialog.vue"

function open({ propsData, template }) {
  const DialogComponent = Vue.extend(Dialog)
  log("comp", DialogComponent)
  return new DialogComponent({
    el: document.createElement("div"),
    propsData,
  })
}

export const DialogProgrammatic = {
  alert(params) {
    log("alert")
    if (typeof params === "string") {
      params = {
        message: params,
      }
    }
    const defaultParam = {
      active: true,
      standalone: true,
    }
    const propsData = merge(defaultParam, params)
    return open({ propsData })
  },
  confirm(params) {
    const defaultParam = {
      hasChoice: true,
      active: true,
      standalone: true,
    }
    const propsData = merge(defaultParam, params)
    return open({ propsData })
  },
  prompt(params) {
    const defaultParam = {
      title: null,
      placeholder: "",
      done: "Done",
      hasInput: true,
      confirmText: "Done",
      canCancel: false,
      active: true,
      standalone: true,
    }
    const propsData = merge(defaultParam, params)
    return open({ propsData })
  },
}

export function dialogAlert(props) {
  return new Promise((resolve, reject) => {
    DialogProgrammatic.alert({
      ...props,
      onCancel: (err) => resolve(false),
      onConfirm: (value) => resolve(true),
    })
  })
}

export function dialogConfirm(props) {
  return new Promise((resolve, reject) => {
    DialogProgrammatic.confirm({
      ...props,
      onCancel: (err) => resolve(false),
      onConfirm: (value) => resolve(true),
    })
  })
}

export function dialogPrompt(props) {
  return new Promise((resolve, reject) => {
    DialogProgrammatic.prompt({
      ...props,
      onCancel: (err) => resolve(null),
      onConfirm: (value) => resolve(value),
    })
  })
}
