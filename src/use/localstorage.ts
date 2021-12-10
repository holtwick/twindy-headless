import { computed } from "vue"

export function useLocalStorageBoolean(name: string, defaultValue: boolean) {
  return computed<boolean>({
    get() {
      return (localStorage[name] ?? defaultValue) === "true"
    },
    set(value) {
      localStorage[name] = String(!!value)
    },
  })
}

export function useLocalStorageNumber(name: string, defaultValue: number) {
  return computed<number>({
    get() {
      return +(localStorage[name] ?? defaultValue)
    },
    set(value) {
      localStorage[name] = String(value)
    },
  })
}

export function useLocalStorageString(name: string, defaultValue: string) {
  return computed<string>({
    get() {
      return String(localStorage[name] ?? defaultValue)
    },
    set(value) {
      localStorage[name] = String(value)
    },
  })
}
