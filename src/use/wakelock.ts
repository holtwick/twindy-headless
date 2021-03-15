import { onBeforeUnmount, onMounted } from "vue"

// https://medium.com/runic-software/keeping-your-webapp-awake-6a02a6f30310

export function useWakeLock() {
  // @ts-ignore
  if (navigator.wakeLock) {
    let _wakelock: any

    let aquireWakelock = async () => {
      try {
        // @ts-ignore
        _wakelock = await navigator.wakeLock.request("screen")
      } catch (err) {
        console.warn("acquiring wake lock failed", err)
      }
    }

    let onVisibilityChange = () => {
      if (document.visibilityState === "visible") aquireWakelock()
    }

    onMounted(async () => {
      aquireWakelock()
      document.addEventListener("visibilitychange", onVisibilityChange)
    })

    onBeforeUnmount(async () => {
      document.removeEventListener("visibilitychange", onVisibilityChange)
      await _wakelock.release()
      _wakelock = null
    })
  }
}
