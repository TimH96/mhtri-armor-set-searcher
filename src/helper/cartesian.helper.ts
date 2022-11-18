export const cartesianProduct = <T, >(...sets: T[][]) =>
  sets.reduce<T[][]>((accSets, set) => accSets.flatMap(accSet => set.map(value => [...accSet, value])), [[]])
