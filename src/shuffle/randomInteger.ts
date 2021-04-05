export function randomInteger(from: number, to: number): number {
  from = Math.floor(from)
  to = Math.floor(to)
  return Math.floor(from + Math.random() * (to - from))
}
