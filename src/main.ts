export * from "./components"

import { App, Plugin } from "vue"
import { twButton, twModal } from "./components"
import twSimple from "./components/tw-simple.vue"

const install = (app: App) => {
  app.component("tw-button", twButton)
  app.component("tw-modal", twModal)
  app.component("tw-simple", twSimple)
}

twButton.install = install
twModal.install = install
twSimple.istall = install

let all = { install, twButton, twModal, twSimple }

export default (all as unknown) as Plugin
