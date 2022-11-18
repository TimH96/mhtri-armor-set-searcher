import Decoration from '../data-provider/models/equipment/Decoration'
import EquipmentSkills from '../data-provider/models/equipment/EquipmentSkills'
import Slots from '../data-provider/models/equipment/Slots'
import DecoPermutation from './models/DecoPermutation'

/** get score of a skill map relative to wanted skills */
const getScoreFromSkillMap = (m: EquipmentSkills, w: EquipmentSkills): number => {
  let score = 0
  for (const [sId] of w) {
    score += m.get(sId) || 0
  }

  return score
}

/** apply score to a list of decos */
const evaluateListOfDecos = (decos: Decoration[], wantedSkills: EquipmentSkills): DecoPermutation => {
  const skillMap: EquipmentSkills = new EquipmentSkills()
  decos.forEach(deco => skillMap.addSkills(deco.skills))

  // get max of default and computed score
  // default score can only be higher than computed when the decos of 2 wanted skills cancel each other out (e.g. handicraft and sharpness)
  const computedScore = getScoreFromSkillMap(skillMap, wantedSkills)
  const defaultScore = Math.max(...Array.from(skillMap.values()))
  const score = (Math.max(computedScore, defaultScore))

  return {
    skills: skillMap,
    decos,
    score,
  }
}

/**
 * checks if deco permutation is the same or better than comparison in respect to wanted skills
 * returns 0 if better/different, returns 1 if same, returns 2 if worse
 */
const decoPermWorseOrSameAsComparison = (perm: DecoPermutation, comparison: DecoPermutation, wantedSkills: EquipmentSkills) => {
  const arr = []
  for (const w of Array.from(wantedSkills.entries())) {
    const wId = w[0]
    const a = perm.skills.get(wId)
    const b = comparison.skills.get(wId)

    if (a > b) return 0
    if (a === b) arr.push(1)
    else arr.push(2)
  }
  return Math.max(...arr)
}

/** returns a mapping of slot level to the amount of score it is worth */
const getDecoSlotScoreMap = (decoPermutationsPerSlotLevel: Map<Slots, DecoPermutation[]>): Map<number, number> => {
  const m = new Map(Array.from(decoPermutationsPerSlotLevel.entries()).map(([slotLevel, permList]) => {
    return [slotLevel, Math.max(...permList.map(x => x.score))]
  }))
  m.set(0, 0)

  return m
}

/** prune a list of deco permutations of all duplicates and downgrades */
const pruneDecoPermutations = (permList: DecoPermutation[], wantedSkills: EquipmentSkills): DecoPermutation[] => {
  // we go through entire list left through right => x
  // for each ele, we check the entire list again => y
  // if y is an upgrade of x, then x will be filtered out
  // if y is the same as x, and y is further right in the list, then x will be filtered
  // only if x has no upgrade, and no element right of it that is the same will it remain in the list
  const res = permList
    .filter((x, i) => {
      let shouldBeFiltered: boolean = false

      for (let j = 0; j < permList.length; j++) {
        if (i === j) continue

        const y = permList[j]
        const v = decoPermWorseOrSameAsComparison(x, y, wantedSkills)

        if (v === 2) {
          shouldBeFiltered = true
          break
        }

        if (j > i && v === 1) {
          shouldBeFiltered = true
          break
        }
      }

      return !shouldBeFiltered
    })

  return res
}

export {
  getScoreFromSkillMap,
  evaluateListOfDecos,
  decoPermWorseOrSameAsComparison,
  getDecoSlotScoreMap,
  pruneDecoPermutations,
}
