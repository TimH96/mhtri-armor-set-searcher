import { DUMMY_PIECE, TORSO_UP_ID } from '../data-provider/data-provider.module'
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
import DecoEvaluation from '../scorer/models/DecoEvaluation'
import DecoPermutation from '../scorer/models/DecoPermutation'
import SearchConstraints from './models/SearchConstraints'
import ScoredSkilledEquipment from './models/ScoredSkilledEquipment'
import { applyArmorFilter, applyCharmFilter, applyRarityFilter, filterHasSkill } from '../data-filter/data-filter.module'
import { evaluateListOfDecos, getDecoSlotScoreMap, getScoreFromSkillMap } from '../scorer/scorer.module'

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
const getDecorationVariationsPerSlotLevel = (decorations: Decoration[], wantedSkills: EquipmentSkills) => {
  // get all decorations of specific slot
  const rawOneSlots = decorations.filter(d => d.requiredSlots === 1)
  const rawTwoSlots = decorations.filter(d => d.requiredSlots === 2)
  const rawThreeSlots = decorations.filter(d => d.requiredSlots === 3)

  // get all variations for 1 slot
  const oneSlotVariations = rawOneSlots.map(x => [x])

  // get all variations for 2 slots
  const twoOneSlotDecoVariations = []
  for (let i = 0; i < oneSlotVariations.length; i++) {
    const x = oneSlotVariations[i]
    for (let j = Math.abs(i); j < oneSlotVariations.length; j++) {
      const y = oneSlotVariations[j]
      twoOneSlotDecoVariations.push(x.concat(y))
    }
  }
  const twoSlotVariations = rawTwoSlots
    .map(x => [x])
    .concat(twoOneSlotDecoVariations)

  // get all variations for 3 slots
  const threeOneSlotDecoVariations = []
  for (let i = 0; i < oneSlotVariations.length; i++) {
    const x = oneSlotVariations[i]
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

  // evaluate all permutations
  const evaluations = [
    oneSlotVariations,
    twoSlotVariations,
    threeSlotVariations,
  ].map(variationList => variationList.map(variation => evaluateListOfDecos(variation, wantedSkills)))

  // throw out duplicates
  const deduplicated = evaluations
    .map(evaluationList => {
      const serializedList: string[] = []
      return evaluationList.filter(variation => {
        if (serializedList.includes(variation.serialized!)) {
          return false
        }

        serializedList.push(variation.serialized!)
        return true
      })
    })

  // throw out variations that are the same as another or downgrades of another
  const pruned: DecoPermutation[][] = deduplicated
    .map(evalsOfSlotLevel => evalsOfSlotLevel.filter((thisEval, i) => {
      // true when there is no evaluation that has the same or better points for every single skill
      // we are trying to find an element that is better
      return !evalsOfSlotLevel.find((comparingEval, j) => {
        if (i === j) return false

        // check every skill
        return Array.from(thisEval.skills.entries()).every(([sId, sVal]) => {
          const comparingSVal = comparingEval.skills.get(sId)

          if (sVal >= 0) {
            if (comparingSVal === undefined) return false
          } else {
            if (comparingSVal === undefined) return true
          }

          return comparingSVal >= sVal
        })
      })
    }))

  // sort by score
  const sorted = pruned.map(x => x.sort((a, b) => b.score - a.score))

  return sorted
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

function * getDecoPermutations (
  permutationsPerArmorSlot: DecoPermutation[][],
  previousEval: DecoEvaluation,
  maximumRemainingScore: number[],
  requiredScore: number,
  slotIndex: number,
): Generator<DecoEvaluation, void, undefined> {
  // base condition if the armor has no slots
  if (permutationsPerArmorSlot.length === 0) {
    yield previousEval
    return
  }

  for (const decoPermutationOfSlot of permutationsPerArmorSlot[slotIndex]) {
    // create and eval new combination of decos
    const thisEval = previousEval.copy()
    thisEval.addDecos(decoPermutationOfSlot)

    // yield it if score is sufficient
    if (thisEval.score >= requiredScore) yield thisEval

    // then yield the next loop if there is one
    if (slotIndex > 0) {
      yield * getDecoPermutations(
        permutationsPerArmorSlot,
        thisEval,
        maximumRemainingScore,
        requiredScore,
        slotIndex - 1,
      )
    }
  }
}

const tryAllDecoPermutationsForArmor = (
  armorEvaluation: ArmorEvaluation,
  decoVariationsPerSlot: DecoPermutation[][],
  wantedSkills: EquipmentSkills,
  constraints: SearchConstraints,
  skillData: StaticSkillData,
): ArmorSet | null => {
  const slotsList: Slots[] = [
    constraints.weaponSlots,
    ...armorEvaluation.equipment.map(x => x.slots),
  ].filter(x => x > 0)

  const permutationsPerArmorSlot = slotsList
    .map(x => decoVariationsPerSlot[x - 1])

  const missingSkills = new EquipmentSkills(Array.from(wantedSkills).map(([sId, sVal]) => {
    return [sId, sVal - armorEvaluation.skills.get(sId)]
  }))
  const missingScore = getScoreFromSkillMap(missingSkills, wantedSkills)

  // get list of maximum score of remaining iterations
  const maximumRemainingScore = [0]
  let sum = 0
  permutationsPerArmorSlot.map(x => x[0].score).forEach((m) => {
    sum += m
    maximumRemainingScore.push(sum)
  })

  if (missingScore === 0) {
    return new ArmorSet(
      armorEvaluation,
      new DecoEvaluation(),
      skillData.skillActivation,
    )
  } else {
    return null
  }

  for (const decoEval of getDecoPermutations(permutationsPerArmorSlot, new DecoEvaluation(), maximumRemainingScore, missingScore, slotsList.length - 1)) {
    const decosSufficient = Array.from(missingSkills)
      .every(([sId, sVal]) => decoEval.skills.get(sId) >= sVal)

    if (decosSufficient) {
      return new ArmorSet(
        armorEvaluation,
        decoEval,
        skillData.skillActivation,
      )
    }
  }

  return null
}

const findSets = (
  armorPieces: ArmorPiece[][],
  decorations: Decoration[],
  charms: Charm[],
  constraints: SearchConstraints,
  skillData: StaticSkillData,
) => {
  const wantedSkills: EquipmentSkills = new EquipmentSkills(constraints.skillActivations.map(x => [x.requiredSkill, x.requiredPoints]))
  const decoVariationsPerSlotLevel = getDecorationVariationsPerSlotLevel(decorations, wantedSkills)
  const slotScoreMap = getDecoSlotScoreMap(decoVariationsPerSlotLevel)
  const initialArmorEval = getIntiailArmorEval(constraints.armorType)
  const wantedScore = getScoreFromSkillMap(wantedSkills, wantedSkills) - slotScoreMap.get(constraints.weaponSlots)!

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
    // try all deco permutations of armor
    const foundSet = tryAllDecoPermutationsForArmor(
      armorEvaluation,
      decoVariationsPerSlotLevel,
      wantedSkills,
      constraints,
      skillData,
    )

    // append set if any was found
    if (foundSet) {
      validSets.push(foundSet)

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
