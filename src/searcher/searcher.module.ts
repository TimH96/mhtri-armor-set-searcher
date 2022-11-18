import { DUMMY_PIECE } from '../data-provider/data-provider.module'
import ArmorPiece from '../data-provider/models/equipment/ArmorPiece'
import ArmorType from '../data-provider/models/equipment/ArmorType'
import Charm from '../data-provider/models/equipment/Charm'
import Decoration from '../data-provider/models/equipment/Decoration'
import EquipmentCategory from '../data-provider/models/equipment/EquipmentCategory'
import EquipmentSkills from '../data-provider/models/equipment/EquipmentSkills'
import SkilledEquipment from '../data-provider/models/equipment/SkilledEquipment'
import Slots from '../data-provider/models/equipment/Slots'
import StaticSkillData from '../data-provider/models/skills/StaticSkillData'
import ArmorEvaluation from '../scorer/models/ArmorEvaluation'
import ArmorSet from './models/ArmorSet'
import DecoPermutation from '../scorer/models/DecoPermutation'
import SearchConstraints from './models/SearchConstraints'
import ScoredSkilledEquipment from '../scorer/models/ScoredSkilledEquipment'
import { applyArmorFilter, applyCharmFilter, applyRarityFilter, filterHasSkill } from '../data-filter/data-filter.module'
import { pruneDecoPermutations, evaluateListOfDecos, getDecoSlotScoreMap, getScoreFromSkillMap } from '../scorer/scorer.module'
import DecoPermutationMap from './models/DecoPermutationMap'

// #region initial search data
/** get initial armor eval with all dummy pieces */
const getIntiailArmorEval = (type: ArmorType) => {
  const categoryArray = [
    EquipmentCategory.HEAD,
    EquipmentCategory.CHEST,
    EquipmentCategory.ARMS,
    EquipmentCategory.WAIST,
    EquipmentCategory.LEGS,
    EquipmentCategory.CHARM,
  ]

  const pieces: ScoredSkilledEquipment[] = categoryArray.map((x) => {
    return {
      ...DUMMY_PIECE,
      type,
      category: x,
      score: 0,
    }
  })

  return new ArmorEvaluation(pieces)
}

/** returns all the ways you can possibly arrange the viable decorations on a given slot level (1, 2, 3) */
const getDecorationVariationsPerSlotLevel = (
  decorations: Decoration[],
  wantedSkills: EquipmentSkills,
): Map<Slots, DecoPermutation[]> => {
  // get all decorations of specific slot
  const rawOneSlots = decorations.filter(d => d.requiredSlots === 1)
  const rawTwoSlots = decorations.filter(d => d.requiredSlots === 2)
  const rawThreeSlots = decorations.filter(d => d.requiredSlots === 3)

  // create dummy for unused slots
  const dummy: Decoration = {
    name: 'None',
    rarity: 0,
    requiredSlots: 0,
    skills: new EquipmentSkills(),
  }

  // get all variations for 1 slot
  const oneSlotVariations = rawOneSlots.map(x => [x]).concat([[dummy]])
  const oneSlotEvaluated = pruneDecoPermutations(oneSlotVariations.map(x => evaluateListOfDecos(x, wantedSkills)), wantedSkills)
  const prunedOneSlotVariations = oneSlotEvaluated.map(x => x.decos)

  // get all variations for 2 slots
  const twoOneSlotDecoVariations = []
  for (let i = 0; i < prunedOneSlotVariations.length; i++) {
    const x = prunedOneSlotVariations[i]
    for (let j = Math.abs(i); j < prunedOneSlotVariations.length; j++) {
      const y = prunedOneSlotVariations[j]
      twoOneSlotDecoVariations.push(x.concat(y))
    }
  }
  const twoSlotVariations = rawTwoSlots
    .map(x => [x])
    .concat(twoOneSlotDecoVariations)
  const twoSlotEvaluated = pruneDecoPermutations(twoSlotVariations.map(x => evaluateListOfDecos(x, wantedSkills)), wantedSkills)

  // get all variations for 3 slots
  const threeOneSlotDecoVariations = []
  for (let i = 0; i < prunedOneSlotVariations.length; i++) {
    const x = prunedOneSlotVariations[i]
    for (let j = Math.abs(i); j < twoOneSlotDecoVariations.length; j++) {
      const y = twoOneSlotDecoVariations[j]
      threeOneSlotDecoVariations.push(x.concat(y))
    }
  }
  const oneAndTwoSlotDecoVariations = []
  for (const oneSlot of rawOneSlots) {
    for (const twoSlot of rawTwoSlots) {
      oneAndTwoSlotDecoVariations.push([oneSlot, twoSlot])
    }
  }
  const threeSlotVariations = rawThreeSlots
    .map(x => [x])
    .concat(oneAndTwoSlotDecoVariations)
    .concat(threeOneSlotDecoVariations)
  const threeSlotEvaluated = pruneDecoPermutations(threeSlotVariations.map(x => evaluateListOfDecos(x, wantedSkills)), wantedSkills)

  // return pruned evaluations
  return new Map([
    [0, []],
    [1, oneSlotEvaluated],
    [2, twoSlotEvaluated],
    [3, threeSlotEvaluated],
  ])
}
// #endregion

// #region search logic
function * getArmorPermutations (
  equipment: ScoredSkilledEquipment[][],
  previousEval: ArmorEvaluation,
  maximumRemainingScore: number[],
  requiredScore: number,
  categoryIndex: number,
): Generator<ArmorEvaluation, void, undefined> {
  for (const piece of equipment[categoryIndex]) {
    // create and eval new set
    const thisEval = previousEval.copy()
    thisEval.addPiece(piece)

    // yield it if score is sufficient
    if (thisEval.score >= requiredScore) yield thisEval
    // otherwise check if its possible to still find sets on this branch and break if not
    else {
      if ((thisEval.score + maximumRemainingScore[categoryIndex]) < requiredScore) break
    }

    // then yield the next loop if there is one
    if (categoryIndex > 0) {
      yield * getArmorPermutations(
        equipment,
        thisEval,
        maximumRemainingScore,
        requiredScore,
        categoryIndex - 1,
      )
    }
  }
}

const findSets = (
  armorPieces: ArmorPiece[][],
  decorations: Decoration[],
  charms: Charm[],
  constraints: SearchConstraints,
  skillData: StaticSkillData,
) => {
  const wantedSkills: EquipmentSkills = new EquipmentSkills(constraints.skillActivations.map(x => [x.requiredSkill, x.requiredPoints]))
  const decoPermutationsPerSlotLevel = getDecorationVariationsPerSlotLevel(decorations, wantedSkills)
  const slotScoreMap = getDecoSlotScoreMap(decoPermutationsPerSlotLevel)
  const initialArmorEval = getIntiailArmorEval(constraints.armorType)
  const wantedScore = getScoreFromSkillMap(wantedSkills, wantedSkills) - slotScoreMap.get(constraints.weaponSlots)!
  const decoPermutationMap = new DecoPermutationMap(decoPermutationsPerSlotLevel, wantedSkills)

  const skilledEquipment: SkilledEquipment[][] = armorPieces
  skilledEquipment.push(charms)

  // score equipment
  const scoredEquipment: ScoredSkilledEquipment[][] = skilledEquipment
    .map(equList => equList.map((equ) => {
      const score = slotScoreMap.get(equ.slots)! + getScoreFromSkillMap(equ.skills, wantedSkills)
      return {
        ...equ,
        score,
      }
    }))

  // sort equipment by score
  const sorted = scoredEquipment.map(l => l.sort((a, b) => b.score - a.score))

  // get list of maximum score of remaining iterations
  const maximumRemainingScore = [0]
  let sum = 0
  sorted.map(x => x[0].score).forEach((m) => {
    sum += m
    maximumRemainingScore.push(sum)
  })

  let length = 0
  const validSets: ArmorSet[] = []
  // try all armor permuations
  for (const armorEvaluation of getArmorPermutations(sorted, initialArmorEval, maximumRemainingScore, wantedScore, armorPieces.length - 1)) {
    // get map of missing skills
    const missingSkills = new EquipmentSkills(Array.from(wantedSkills).map(([sId, sVal]) => {
      return [sId, sVal - armorEvaluation.skills.get(sId)]
    }))
    const missingScore = getScoreFromSkillMap(missingSkills, wantedSkills)

    // get list of all possible deco evaluations for slots of set
    const decoPerms = decoPermutationMap.get(armorEvaluation.getSlots())

    // find a sufficient deco evaluation
    const sufficientDecoPerm = decoPerms.find((dP) => {
      if (dP.score < missingScore) return false
      return Array.from(missingSkills)
        .every(([sId, sVal]) => dP.skills.get(sId) >= sVal)
    })

    // build and append set if any possible deco eval was found
    if (sufficientDecoPerm) {
      const set = new ArmorSet(armorEvaluation, sufficientDecoPerm, skillData.skillActivation)
      validSets.push(set)

      // exit if enough sets found
      if (length === constraints.limit - 1) break
      length++
    }
  }

  return validSets
}
// #endregion

// #region entrypoint
const search = (
  armorPieces: ArmorPiece[][],
  decorations: Decoration[],
  charms: Charm[],
  constraints: SearchConstraints,
  skillData: StaticSkillData,
) => {
  const a = armorPieces
    .map((piecesOfCategory, i) => {
      return applyArmorFilter(piecesOfCategory, constraints.armorRarity, constraints.armorType, i, constraints.skillActivations)
    })
  const c = applyCharmFilter(charms, constraints.skillActivations)
  const d = applyRarityFilter(decorations, constraints.decoRarity)
    .filter(x => filterHasSkill(x, constraints.skillActivations))

  return findSets(
    a,
    d as Decoration[],
    c,
    constraints,
    skillData,
  )
}
// #endregion

export { search }
