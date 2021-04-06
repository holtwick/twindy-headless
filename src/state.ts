import { ref, Ref } from "vue"
import { TwindyNotification } from "./types"

export let notifications: Ref<TwindyNotification[]> = ref([])
