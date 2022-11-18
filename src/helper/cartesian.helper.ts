export const cartesianProduct = <T>(...sets: T[][]) =>
  sets.reduce<T[][]>(
    (accSets, set) =>
      accSets.flatMap((accSet) => set.map((value) => [...accSet, value])),
    [[]],
  )

/**
 * source: https://github.com/ehmicky/fast-cartesian/blob/main/src/main.js
 */
export function fastCartesian (arrays: any[]) {
  if (arrays.length === 0) {
    return []
  }

  const loopFunc = getLoopFunc(arrays.length)
  const result: never[] = []
  loopFunc(arrays, result)
  return result
}

const getLoopFunc = function (length: string | number) {
  const cachedLoopFunc = cache[length]

  if (cachedLoopFunc !== undefined) {
    return cachedLoopFunc
  }

  const loopFunc = mGetLoopFunc(length)
  cache[length] = loopFunc
  return loopFunc
}

const cache = {}

// Create a function with `new Function()` that does:
//   function(arrays, results) {
//     for (const value0 of arrays[0]) {
//       for (const value1 of arrays[1]) {
//         // and so on
//         results.push([value0, value1])
//       }
//     }
//   }
const mGetLoopFunc = function (length: number) {
  const indexes = Array.from({ length }, getIndex)
  const start = indexes
    .map((index) => `for (const value${index} of arrays[${index}]) {`)
    .join('\n')
  const middle = indexes.map((index) => `value${index}`).join(', ')
  const end = '}\n'.repeat(length)

  // eslint-disable-next-line no-new-func
  return new Function(
    'arrays',
    'result',
    `${start}\nresult.push([${middle}])\n${end}`,
  )
}

const getIndex = function (value: any, index: any) {
  return String(index)
}
