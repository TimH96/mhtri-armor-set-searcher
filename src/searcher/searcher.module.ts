import { MAX_RARITY, TORSO_UP_ID } from '../data-provider/data-provider.module'
import ArmorPiece from '../data-provider/models/equipment/ArmorPiece'
import ArmorType from '../data-provider/models/equipment/ArmorType'
import Charm from '../data-provider/models/equipment/Charm'
import Decoration from '../data-provider/models/equipment/Decoration'
import EquipmentCategory from '../data-provider/models/equipment/EquipmentCategory'
import EquipmentSkills from '../data-provider/models/equipment/EquipmentSkills'
import Rarity from '../data-provider/models/equipment/Rarity'
import SkilledItem from '../data-provider/models/equipment/SkilledItem'
import Slots from '../data-provider/models/equipment/Slots'
import SkillActivation from '../data-provider/models/skills/SkillActivation'
import ArmorSet from './models/ArmorSet'
import DecoEvaluation from './models/DecoEvaluation'
import DecoSlots from './models/DecoSlots'
import SearchConstraints from './models/SearchConstraints'
import StaticSkillData from './models/StaticSkillData'

function * getArmorPermutations (armorPieces: ArmorPiece[][], charms: Charm[]) {
  for (const head of armorPieces[0]) {
    for (const chest of armorPieces[1]) {
      for (const arms of armorPieces[2]) {
        for (const waist of armorPieces[3]) {
          for (const legs of armorPieces[4]) {
            for (const charm of charms) {
              const set: ArmorSet = new ArmorSet({
                head,
                chest,
                arms,
                waist,
                legs,
                charm,
              })
              yield set
            }
          }
        }
      }
    }
  }
}

function * getDecorationPermutationsForSet (
  set: ArmorSet,
  slotsList: DecoSlots[],
  possibilitiesPerArmorSlot: DecoEvaluation[][],
  chosenVariations: DecoEvaluation[],
  i: number,
): Generator<DecoEvaluation, void, undefined> {
  if (i === -1) {
    const combinedDecoEvaluation: DecoEvaluation = {
      decos: chosenVariations.map(v => v.decos).flat(),
      skills: chosenVariations
        .map(v => v.skills)
        .reduce((p, c) => {
          return addSkillMaps(p, c)
        }, new Map()),
    }
    yield combinedDecoEvaluation
  } else {
    for (let j = 0; j < possibilitiesPerArmorSlot[i].length; j++) {
      yield * getDecorationPermutationsForSet(
        set,
        slotsList,
        possibilitiesPerArmorSlot,
        chosenVariations.concat(possibilitiesPerArmorSlot[i][j]),
        i - 1,
      )
    }
  }
}

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
        skills: new Map(),
      }
      highestGenericSlotCharm.push(newC)
      break
    }
  }

  // build list of charms with wanted skills or with slots
  const result = charms
    .filter(x => filterHasSkill(x, skills))
    .concat(...highestGenericSlotCharm)

  // include dummy if there are no fitting pieces
  if (result.length === 0) {
    result.push({
      name: 'None',
      slots: 0,
      category: EquipmentCategory.CHARM,
      rarity: 0,
      skills: new Map(),
    })
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
        skills: new Map(),
      }
      highestGenericSlotPiece.push(p)
      break
    }
  }

  // find piece with torso up with highest defense
  const torsoUpPiece: ArmorPiece[] = [sorted.find(p => p.skills.get(TORSO_UP_ID) !== undefined)].filter(x => x !== undefined) as ArmorPiece[]

  // build list of pieces with wanted skills, with slots, or with torso up
  const result = sorted
    .filter(x => filterHasSkill(x, skills))
    .concat(...highestGenericSlotPiece)
    .concat(...torsoUpPiece)

  // include dummy if there are no fitting pieces
  if (result.length === 0) {
    result.push({
      type,
      defense: { base: 0, max: 0, maxLr: 0 },
      resistance: [0, 0, 0, 0, 0],
      name: 'None',
      slots: 0,
      category,
      rarity: 0,
      skills: new Map(),
    })
  }

  return result
}

const serializeSkillMap = (m: EquipmentSkills) => {
  return Array.from(m.entries())
    .sort(([aId, _a], [bId, _b]) => bId - aId)
    .map(([sId, sVal]) => `${sId}:${sVal}`)
    .join(',')
}

const evaluateDecoPermutation = (decos: Decoration[]): DecoEvaluation => {
  const skillMap: EquipmentSkills = new Map()
  decos.forEach((deco) => {
    Array.from(deco.skills.entries()).forEach(([sId, sVal]) => {
      skillMap.has(sId)
        ? skillMap.set(sId, skillMap.get(sId)! + sVal)
        : skillMap.set(sId, sVal)
    })
  })

  return {
    skills: skillMap,
    serialized: serializeSkillMap(skillMap),
    decos,
  }
}

/** returns all the ways you can possibly arrange the viable decorations on a given slot level (1, 2, 3) */
const getDecorationVariationsPerSlot = (decorations: Decoration[]) => {
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
  ].map(variationList => variationList.map(variation => evaluateDecoPermutation(variation)))

  // throw out duplicates and return
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
  return deduplicated
}

const addSkillMaps = (a: EquipmentSkills, b: EquipmentSkills) => {
  const newSkillMap: EquipmentSkills = new Map()
  for (const m of [a, b]) {
    for (const [sId, sVal] of Array.from(m.entries())) {
      const existingVal = newSkillMap.get(sId)

      if (existingVal) {
        newSkillMap.set(sId, existingVal + sVal)
      } else {
        newSkillMap.set(sId, sVal)
      }
    }
  }

  return newSkillMap
}

const tryAllDecoPermutationsForSet = (
  set: ArmorSet,
  decoVariationsPerSlot: DecoEvaluation[][],
  wantedSkills: SkillActivation[],
  constraints: SearchConstraints,
): ArmorSet | null => {
  const slotsList: DecoSlots[] = [
    { slots: set.charm.slots, torsoUp: false },
    { slots: constraints.weaponSlots, torsoUp: false },
    ...set.getPieces().map((x) => {
      return {
        slots: x.slots,
        torsoUp: x.category === EquipmentCategory.CHEST && set.torsoUpCount !== 0,
      }
    }),
  ].filter(x => x.slots > 0)

  const possibilitiesPerArmorSlot = slotsList
    .map(s => decoVariationsPerSlot[s.slots - 1])

  const missingPoints = new Map(wantedSkills.map((skill) => {
    return [
      skill.requiredSkill,
      skill.requiredPoints - set.partial.skills.get(skill.requiredSkill)! || 0,
    ]
  }))

  // after many confusing transforms right here we finally get a list of deco evaluations
  // where each evaluation is the combination of the evaluation of each individual piece
  // therefore holding both the total amount of decos and skills for the entire set
  for (const eva of getDecorationPermutationsForSet(set, slotsList, possibilitiesPerArmorSlot, [], slotsList.length - 1)) {
    const decosAreSufficient = Array.from(missingPoints.entries()).every(([sId, sVal]) => {
      return eva.skills.has(sId) && eva.skills.get(sId)! >= sVal
    })

    if (decosAreSufficient) {
      set.addDecorations(eva.decos)
      return set
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
  const decoVariations = getDecorationVariationsPerSlot(decorations)

  const validSets = []
  let length = 0
  const wantedSkills = constraints.skillActivations.map(x => x)
  for (const set of getArmorPermutations(armorPieces, charms)) {
    const foundSet = tryAllDecoPermutationsForSet(set, decoVariations, wantedSkills, constraints)
    if (foundSet) {
      foundSet.evaluate(skillData.skillActivation)
      validSets.push(foundSet)
      if (length === constraints.limit) break
      length++
    }
  }

  return validSets
}

const search = (
  armorPieces: ArmorPiece[][],
  decorations: Decoration[],
  charms: Charm[],
  constraints: SearchConstraints,
  skillData: StaticSkillData,
) => {
  const a = armorPieces
    .map((piecesOfCategory, i) => {
      return applyArmorFilter(piecesOfCategory, constraints.armorRarity, constraints.armorType, i + 1, constraints.skillActivations)
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

export { search }
