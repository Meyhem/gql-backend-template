export function fromStandardDate(d?: Date) {
  if (!d) return undefined
  return d.toISOString()
}

export function toStandardDate(d?: string) {
  if (!d) return undefined
  return new Date(d)
}
