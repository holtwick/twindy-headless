let ctr = 1

export function UUID(): string {
  return `id-${ctr++}`
}
