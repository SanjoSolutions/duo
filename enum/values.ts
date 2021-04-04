export function values(enumeration: any): any[] {
  return Object.entries(enumeration)
    .filter(([key]) => Number.isNaN(Number(key)))
    .map(([_, value]) => value)
}
