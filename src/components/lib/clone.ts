export function cloneObject<T>(obj: T): T | undefined {
  try {
    if (typeof obj === "object") {
      return JSON.parse(JSON.stringify(obj))
    }
    return obj
  } catch (err) {
    console.error("cloneObject error:", err)
  }
  return undefined
}
