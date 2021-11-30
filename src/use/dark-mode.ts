import { useSessionStorage } from "@vueuse/core"
import { names } from "../config"
import { watch, Ref, ref } from "vue"

let darkMode = ref(false)

if (typeof window !== "undefined") {
  const query = "(prefers-color-scheme: dark)"
  const mediaQuery = window.matchMedia(query)

  if ("addEventListener" in mediaQuery) {
    mediaQuery.addEventListener("change", (event) => {
      setDarkMode(event.matches)
    })
  }

  darkMode = useSessionStorage(names.darkMode, mediaQuery.matches)

  function setDarkMode(value: boolean) {
    darkMode.value = !!value
    applyTheme()
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
}

export function useDarkMode(): Ref<boolean> {
  return darkMode
}
