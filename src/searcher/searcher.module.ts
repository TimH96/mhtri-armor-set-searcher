import ArmorPiece from '../data-provider/models/equipment/ArmorPiece'
import ArmorType from '../data-provider/models/equipment/ArmorType'
import Charm from '../data-provider/models/equipment/Charm'
import Decoration from '../data-provider/models/equipment/Decoration'
import EquipmentCategory from '../data-provider/models/equipment/EquipmentCategory'
import Rarity from '../data-provider/models/equipment/Rarity'
import SkilledItem from '../data-provider/models/equipment/SkilledItem'
import Slots from '../data-provider/models/equipment/Slots'
import SkillActivation from '../data-provider/models/skills/SkillActivation'
import SearchConstraints from './models/SearchConstraints'

const MAX_RARITY = 7
const TORSO_UP_ID = 83

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

const filterHasSkillMax = (item: Charm, desiredSkills: SkillActivation[]) => {
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
  // find generic slot charms
  const genericSlotCharms = [1, 2, 3].map((slots) => {
    const hasCharmWithSlots = charms.find(c => c.slots === slots)
    if (!hasCharmWithSlots) {
      return undefined
    }

    const c: Charm = {
      name: `${slots} Slot Charm`,
      slots: slots as Slots,
      category: EquipmentCategory.CHARM,
      rarity: 0,
      skills: new Map(),
    }
    return c
  }).filter(x => x !== undefined) as Charm[]

  // return list of charms with wanted skills or with slots
  return charms
    .filter(x => filterHasSkillMax(x, skills))
    .concat(...genericSlotCharms)
}

const applyArmorFilter = (pieces: ArmorPiece[], rarity: Rarity, type: ArmorType, skills: SkillActivation[]) => {
  const rarityFiltered = applyRarityFilter(pieces, rarity) as ArmorPiece[]
  const typeFiltered = rarityFiltered.filter(p => filterType(p, type))
  const sorted = typeFiltered.sort((a, b) => b.defense.max - a.defense.max)

  // find generic slot pieces with highest defense
  const genericSlotPieces = [1, 2, 3].map((slots) => {
    const hasPieceWithSlots = sorted.find(p => p.slots === slots)
    if (hasPieceWithSlots === undefined) {
      return undefined
    }

    const aPiece = hasPieceWithSlots
    const p: ArmorPiece = {
      type: aPiece.type,
      defense: aPiece.defense,
      resistance: aPiece.resistance,
      name: `${slots} Slot Piece`,
      slots: slots as Slots,
      category: aPiece.category,
      rarity: aPiece.rarity,
      skills: new Map(),
    }
    return p
  }).filter(x => x !== undefined) as ArmorPiece[]

  // find piece with torso up with highest defense
  const torsoUpPiece = sorted.find(p => p.skills.get(TORSO_UP_ID) !== undefined)

  // return list of pieces with wanted skills, with slots, or with torso up
  const result = pieces
    .filter(x => filterHasSkill(x, skills))
    .concat(...genericSlotPieces)
  return torsoUpPiece ? result.concat(torsoUpPiece) : result
}

const findSets = (
  armoritems: ArmorPiece[][],
  decorations: Decoration[],
  charms: Charm[],
  constraints: SearchConstraints,
) => {
  console.log({armoritems})
  console.log({decorations})
  console.log({charms})
}

const search = async (
  armorPieces: ArmorPiece[][],
  decorations: Decoration[],
  charms: Charm[],
  constraints: SearchConstraints,
) => {
  const a = armorPieces
    .map((piecesOfCategory) => {
      return applyArmorFilter(piecesOfCategory, constraints.armorRarity, constraints.armorType, constraints.skillActivations)
    })
  const c = applyCharmFilter(charms, constraints.skillActivations)
  const d = applyRarityFilter(decorations, constraints.decoRarity)
    .filter(x => filterHasSkill(x, constraints.skillActivations))

  return findSets(
    a,
    d as Decoration[],
    c,
    constraints,
  )
}

export { search }
