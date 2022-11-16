import { MAX_RARITY, TORSO_UP_ID } from '../data-provider/data-provider.module'
import ArmorPiece from '../data-provider/models/equipment/ArmorPiece'
import ArmorType from '../data-provider/models/equipment/ArmorType'
import Charm from '../data-provider/models/equipment/Charm'
import Decoration from '../data-provider/models/equipment/Decoration'
import EquipmentCategory from '../data-provider/models/equipment/EquipmentCategory'
import EquipmentSkills from '../data-provider/models/equipment/EquipmentSkills'
import Rarity from '../data-provider/models/equipment/Rarity'
import SkilledEquipment from '../data-provider/models/equipment/SkilledEquipment'
import SkilledItem from '../data-provider/models/equipment/SkilledItem'
import Slots from '../data-provider/models/equipment/Slots'
import SkillActivation from '../data-provider/models/skills/SkillActivation'
import StaticSkillData from './models/StaticSkillData'
import ArmorEvaluation from './models/ArmorEvaluation'
import ArmorSet from './models/ArmorSet'
import DecoEvaluation from './models/DecoEvaluation'
import DecoPermutation from './models/DecoPermutation'
import SearchConstraints from './models/SearchConstraints'
import ScoredSkilledEquipment from './models/ScoredSkilledEquipment'

// #region helpers
const dummyPiece: ArmorPiece = {
  name: 'None',
  type: -1,
  defense: { base: 0, max: 0, maxLr: 0 },
  resistance: [0, 0, 0, 0, 0],
  category: -1,
  slots: 0,
  rarity: 0,
  skills: new EquipmentSkills(),
}

const scoreSkillMap = (m: EquipmentSkills, w: EquipmentSkills): number => {
  let score = 0
  for (const [sId] of w) {
    score += m.get(sId) || 0
  }

  return score
}

const serializeSkillMap = (m: EquipmentSkills) => {
  return Array.from(m.entries())
    .sort(([aId, _a], [bId, _b]) => bId - aId)
    .map(([sId, sVal]) => `${sId}:${sVal}`)
    .join(',')
}

const evaluateListOfDecos = (decos: Decoration[], wantedSkills: EquipmentSkills): DecoPermutation => {
  const skillMap: EquipmentSkills = new EquipmentSkills()
  decos.forEach(deco => skillMap.addSkills(deco.skills))
  const score = scoreSkillMap(skillMap, wantedSkills)

  return {
    skills: skillMap,
    serialized: serializeSkillMap(skillMap),
    decos,
    score,
  }
}
// #endregion

// #region data filters
const filterType = (piece: ArmorPiece, type: ArmorType) => {
  return piece.type === ArmorType.ALL || piece.type === type
}

const filterRarity = (item: SkilledItem, rarity: Rarity) => {
  return item.rarity <= rarity
}

const filterHasSkill = (item: SkilledItem, desiredSkills: SkillActivation[]) => {
  return desiredSkills.some((act) => {
    const s = item.skills.get(act.requiredSkill)
    return s && s > 0
  })
}

const applyRarityFilter = (items: SkilledItem[], rarity: Rarity) => {
  if (rarity === MAX_RARITY) return items
  return items.filter(x => filterRarity(x, rarity))
}

const applyCharmFilter = (charms: Charm[], skills: SkillActivation[]) => {
  // find highest generic slot charms
  const highestGenericSlotCharm: Charm[] = []
  for (const slots of [3, 2, 1]) {
    const x = charms.find(c => c.slots === slots)
    if (x) {
      const newC: Charm = {
        name: `${slots} Slot Charm`,
        slots: slots as Slots,
        category: EquipmentCategory.CHARM,
        rarity: 0,
        skills: new EquipmentSkills(),
      }
      highestGenericSlotCharm.push(newC)
      break
    }
  }

  // build list of charms with wanted skills or with slots
  const result = charms
    .filter(x => filterHasSkill(x, skills))
    .concat(...highestGenericSlotCharm)

  // return list with dummy charm if there are no pieces
  if (result.length === 0) {
    return [{
      ...dummyPiece,
      category: EquipmentCategory.CHARM,
    }]
  }

  return result
}

const applyArmorFilter = (pieces: ArmorPiece[], rarity: Rarity, type: ArmorType, category: EquipmentCategory, skills: SkillActivation[]) => {
  const rarityFiltered = applyRarityFilter(pieces, rarity) as ArmorPiece[]
  const typeFiltered = rarityFiltered.filter(p => filterType(p, type))
  const sorted = typeFiltered.sort((a, b) => b.defense.max - a.defense.max)

  // find generic slot pieces with highest defense
  const highestGenericSlotPiece: ArmorPiece[] = []
  for (const slots of [3, 2, 1]) {
    const x = sorted.find(p => p.slots === slots)
    if (x) {
      const p: ArmorPiece = {
        type: x.type,
        defense: x.defense,
        resistance: x.resistance,
        name: `${slots} Slot Piece`,
        slots: slots as Slots,
        category: x.category,
        rarity: x.rarity,
        skills: new EquipmentSkills(),
      }
      highestGenericSlotPiece.push(p)
      break
    }
  }

  // find piece with torso up with highest defense
  // TODO readd torso up pieces
  // const torsoUpPiece: ArmorPiece[] = [sorted.find(p => p.skills.get(TORSO_UP_ID) !== undefined)].filter(x => x !== undefined) as ArmorPiece[]

  // build list of pieces with wanted skills, with slots, or with torso up
  const result = sorted
    .filter(x => filterHasSkill(x, skills))
    .concat(...highestGenericSlotPiece)
    // .concat(...torsoUpPiece)

  // return list with dummy element if there are no pieces
  if (result.length === 0) {
    return [{
      ...dummyPiece,
      type,
      category,
    }]
  }

  return result
}
// #endregion

// #region initial search data
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
      ...dummyPiece,
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

/** returns a mapping of slot level to the amount of score it is worth */
const getDecoSlotScoreMap = (decoVariationsPerSlotLevel: DecoPermutation[][]): Map<number, number> => {
  const m = new Map()

  const slotValueArray = decoVariationsPerSlotLevel
    .map(variationsOfSlot => Math.max(...variationsOfSlot.map(x => x.score)))
    .map((score, i) => [i + 1, score])

  slotValueArray.forEach(([l, s]) => m.set(l, s))
  m.set(0, 0)

  return m
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
  const missingScore = scoreSkillMap(missingSkills, wantedSkills)

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
  const wantedScore = scoreSkillMap(wantedSkills, wantedSkills) - slotScoreMap.get(constraints.weaponSlots)!

  const skilledEquipment: SkilledEquipment[][] = armorPieces
  skilledEquipment.push(charms)

  // score equipment
  const scoredEquipment: ScoredSkilledEquipment[][] = skilledEquipment
    .map(equList => equList.map((equ) => {
      const score = slotScoreMap.get(equ.slots)! + scoreSkillMap(equ.skills, wantedSkills)
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
