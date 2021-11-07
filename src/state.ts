import { ref, Ref } from "vue"
import { TwindyNotification } from "./types"

export var notifications: Ref<TwindyNotification[]> = ref([])

export var twIconUrl: string | undefined

export function setIconUrl(url: string) {
  twIconUrl = url
}
