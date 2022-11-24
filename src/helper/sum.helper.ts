export const sum = (arr: number[], end?: number): number => {
  const j = end || arr.length
  let r = 0

  for (let i = 0; i < j; i++) {
    r += arr[i]
  }

  return r
}
