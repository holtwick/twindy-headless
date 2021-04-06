import { useSessionStorage } from "@vueuse/core"
import { names } from "../config"
import { watch, Ref } from "vue"

const query = "(prefers-color-scheme: dark)"
const mediaQuery = window.matchMedia(query)

if ("addEventListener" in mediaQuery) {
  mediaQuery.addEventListener("change", (event) => {
    setDarkMode(event.matches)
  })
}

let darkMode = useSessionStorage(names.darkMode, mediaQuery.matches)

function setDarkMode(value: boolean) {
  darkMode.value = !!value
  applyTheme()
}

export function useDarkMode(): Ref<boolean> {
  return darkMode
}

watch(darkMode, applyTheme)

function applyTheme() {
  if (darkMode.value) {
    document.documentElement.classList.add("dark")
    document.documentElement.classList.remove("light")
  } else {
    document.documentElement.classList.add("light")
    document.documentElement.classList.remove("dark")
  }
}

applyTheme()
