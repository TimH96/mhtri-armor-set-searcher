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
import { pruneDecoPermutations, evaluateListOfDecos, getDecoSlotScoreMap, getScoreFromSkillMap, scoreTorsoUpPieces } from '../scorer/scorer.module'
import DecoEvaluation from '../scorer/models/DecoEvaluation'
import DecoMinSlotMap from '../scorer/models/DecoMinSlotMap'

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

function * getDecoPermutations (
  decoPermutationsPerSlotLevel: Map<Slots, DecoPermutation[]>,
  slotsOfArmor: Slots[],
  previousEval: DecoEvaluation,
  slotIndex: number,
): Generator<DecoEvaluation, void, undefined> {
  const slotLevel = slotsOfArmor[slotIndex]
  for (const perm of decoPermutationsPerSlotLevel.get(slotLevel)!) {
    // create and eval new set
    const thisEval = previousEval.copy()
    thisEval.addPerm(perm, slotLevel)

    // yield it if score is sufficient
    if (thisEval.requiredSlots <= 0) yield thisEval
    // otherwise check if its possible to still find sets on this branch and break if not
    else {
      if (thisEval.unusedSlotsSum < thisEval.requiredSlots) continue
    }

    // then yield the next loop if there is one
    if (slotIndex > 0) {
      yield * getDecoPermutations(
        decoPermutationsPerSlotLevel,
        slotsOfArmor,
        thisEval,
        slotIndex - 1,
      )
    }
  }
}

const transformTorsoUpDecoPermutation = (perm: DecoPermutation, torsoUp: number): DecoPermutation => {
  const factor = torsoUp + 1

  const score = perm.score * factor
  const decos = perm.decos.map(d => {
    const newSkills = new EquipmentSkills(d.skills)
    newSkills.multiply(factor)
    const newDeco: Decoration = {
      ...d,
      affectedByTorsoUp: true,
      name: d.name.concat(' (TorsoUp)'),
      skills: newSkills,
    }

    return newDeco
  })
  const newTotalSkills = new EquipmentSkills(perm.skills)
  newTotalSkills.multiply(factor)
  const skills = newTotalSkills

  return {
    score,
    decos,
    skills,
  }
}

const findSufficientDecoPermutation = (
  armorEval: ArmorEvaluation,
  constraints: SearchConstraints,
  wantedSkills: EquipmentSkills,
  decoMinSlotMap: DecoMinSlotMap,
  decoPermutationsPerSlotLevel: Map<Slots, DecoPermutation[]>,
): DecoEvaluation | undefined => {
  const _inner = (
    _slotList: Slots[],
    _initialEval: DecoEvaluation,
  ): DecoEvaluation | undefined => {
    if (_initialEval.requiredSlots <= 0) return _initialEval
    if (_initialEval.unusedSlotsSum > _initialEval.requiredSlots) return undefined
    if (_slotList.length === 0) return undefined

    const decoEvaluation = getDecoPermutations(
      decoPermutationsPerSlotLevel,
      _slotList,
      _initialEval,
      _slotList.length - 1,
    ).next().value

    if (decoEvaluation) return decoEvaluation
    return undefined
  }

  let r: DecoEvaluation | undefined
  const torsoSlots = armorEval.equipment[EquipmentCategory.CHEST].slots
  const missingSkills = new EquipmentSkills(Array.from(wantedSkills).map(([sId, sVal]) => {
    return [sId, sVal - armorEval.skills.get(sId)]
  }))
  const slotSum = armorEval.totalSlots + constraints.weaponSlots

  if (armorEval.torsoUp > 0 && torsoSlots > 0) {
    // if torso up, fill the chest slots and then iterate over permutations from there
    const slotList = armorEval.getSlotsExceptChest().concat(constraints.weaponSlots ? constraints.weaponSlots : [])
    const slotSumWithoutTorso = slotSum - torsoSlots
    const initialEval = new DecoEvaluation(decoMinSlotMap, slotSumWithoutTorso, missingSkills)
    for (const chestPerm of decoPermutationsPerSlotLevel.get(torsoSlots)!) {
      const transformedPerm = transformTorsoUpDecoPermutation(chestPerm, armorEval.torsoUp)
      const copiedEval = initialEval.copy()
      copiedEval.addPerm(transformedPerm, torsoSlots)
      const temp = _inner(slotList, copiedEval)
      if (temp) {
        r = temp
        break
      }
    }
  } else {
    // otherwise just iterate over permutations
    const slotList = armorEval.getSlots().concat(constraints.weaponSlots ? constraints.weaponSlots : [])
    r = _inner(slotList, new DecoEvaluation(decoMinSlotMap, armorEval.totalSlots + constraints.weaponSlots, missingSkills))
  }

  return r
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
  const decoMinSlotMap = new DecoMinSlotMap(decorations, wantedSkills)

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

  // reorder equipment and manually rescore torso up pieces
  const maxTorsoScore = Math.max(...scoredEquipment[1].map(x => x.score))
  const readjustedEquipment = [
    scoredEquipment[1], // chest first to simplify torso up calculation
    scoredEquipment[0].map(x => scoreTorsoUpPieces(x, maxTorsoScore)),
    scoredEquipment[2], // arms cant have torso up
    scoredEquipment[3].map(x => scoreTorsoUpPieces(x, maxTorsoScore)),
    scoredEquipment[4].map(x => scoreTorsoUpPieces(x, maxTorsoScore)),
    scoredEquipment[5], // charm cant have torso up
  ]

  // sort equipment by score
  const sorted = readjustedEquipment.map(l => l.sort((a, b) => b.score - a.score))

  // get list of maximum score of remaining iterations
  const maximumRemainingScore = [0]
  let sumOfAllIterations = 0
  sorted.map(x => x[0].score).forEach((m) => {
    sumOfAllIterations += m
    maximumRemainingScore.push(sumOfAllIterations)
  })

  let length = 0
  const validSets: ArmorSet[] = []
  // try all viable armor permuations
  for (const armorEvaluation of getArmorPermutations(
    sorted,
    initialArmorEval,
    maximumRemainingScore,
    wantedScore,
    sorted.length - 1,
  )) {
    // find first sufficient deco eval
    const decoEvaluation = findSufficientDecoPermutation(
      armorEvaluation,
      constraints,
      wantedSkills,
      decoMinSlotMap,
      decoPermutationsPerSlotLevel,
    )

    // build and append set if there is any deco eval
    if (decoEvaluation) {
      const set = new ArmorSet(armorEvaluation, decoEvaluation, skillData.skillActivation)
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
