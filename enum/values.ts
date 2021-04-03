export function values(enumeration: any): any[] {
  return Object.entries(enumeration)
    .filter(([key, value]) => Number.isNaN(Number(key)))
    .map(([key, value]) => value)
}
