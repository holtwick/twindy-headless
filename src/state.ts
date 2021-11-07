import { ref, Ref } from "vue"
import { Logger } from "zeed"
import { TwindyNotification } from "./types"

const log = Logger("state")

export var notifications: Ref<TwindyNotification[]> = ref([])

export var twIconUrl: string | undefined

export function setIconUrl(url: string) {
  twIconUrl = url
  log.info("set icon", twIconUrl)
}
