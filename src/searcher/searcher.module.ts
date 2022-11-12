import { MAX_RARITY, TORSO_UP_ID } from '../data-provider/data-provider.module'
import ArmorPiece from '../data-provider/models/equipment/ArmorPiece'
import ArmorType from '../data-provider/models/equipment/ArmorType'
import Charm from '../data-provider/models/equipment/Charm'
import Decoration from '../data-provider/models/equipment/Decoration'
import EquipmentCategory from '../data-provider/models/equipment/EquipmentCategory'
import Rarity from '../data-provider/models/equipment/Rarity'
import SkilledItem from '../data-provider/models/equipment/SkilledItem'
import Slots from '../data-provider/models/equipment/Slots'
import SkillActivation from '../data-provider/models/skills/SkillActivation'
import SkillActivationMap from '../data-provider/models/skills/SkillActivationMap'
import ArmorSet from './models/ArmorSet'
import SearchConstraints from './models/SearchConstraints'
import StaticSkillData from './models/StaticSkillData'

function * getArmorPermutations (armorPieces: ArmorPiece[][], charms: Charm[], activationGetter: () => SkillActivationMap) {
  for (const head of armorPieces[0]) {
    for (const chest of armorPieces[1]) {
      for (const arms of armorPieces[2]) {
        for (const waist of armorPieces[3]) {
          for (const legs of armorPieces[4]) {
            for (const charm of charms) {
              const set: ArmorSet = new ArmorSet({
                head: { ...head, usedSlots: 0, remainingSlots: head.slots },
                chest: { ...chest, usedSlots: 0, remainingSlots: chest.slots },
                arms: { ...arms, usedSlots: 0, remainingSlots: arms.slots },
                waist: { ...waist, usedSlots: 0, remainingSlots: waist.slots },
                legs: { ...legs, usedSlots: 0, remainingSlots: legs.slots },
                charm: { ...charm, usedSlots: 0, remainingSlots: charm.slots },
              }, activationGetter)
              yield set
            }
          }
        }
      }
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
    return s && s.points > 0
  })
}

const applyRarityFilter = (items: SkilledItem[], rarity: Rarity) => {
  if (rarity === MAX_RARITY) {
    return items
  }

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

const findSets = (
  armorPieces: ArmorPiece[][],
  decorations: Decoration[],
  charms: Charm[],
  constraints: SearchConstraints,
  skillData: StaticSkillData,
) => {
  const getter = () => {
    return skillData.skillActivation
  }

  const validSets = []
  for (const set of getArmorPermutations(armorPieces, charms, getter)) {
    const wantedIds = constraints.skillActivations.map(x => x.id)
    const activatedIds = set.evaluation.activations.map(x => x.id)

    if (wantedIds.every(wantedAct => activatedIds.includes(wantedAct))) {
      validSets.push(set)

      if (validSets.length === constraints.limit) break
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
