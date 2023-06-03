import { DUMMY_PIECE, MAX_RARITY, TORSO_UP_ID } from '../data-provider/data-provider.module'
import ArmorPiece from '../data-provider/models/equipment/ArmorPiece'
import ArmorType from '../data-provider/models/equipment/ArmorType'
import Charm from '../data-provider/models/equipment/Charm'
import EquipmentCategory from '../data-provider/models/equipment/EquipmentCategory'
import EquipmentMin from '../data-provider/models/equipment/EquipmentMin'
import EquipmentSkills from '../data-provider/models/equipment/EquipmentSkills'
import Rarity from '../data-provider/models/equipment/Rarity'
import SkilledItem from '../data-provider/models/equipment/SkilledItem'
import Slots from '../data-provider/models/equipment/Slots'
import SkillActivation from '../data-provider/models/skills/SkillActivation'

const filterType = (piece: ArmorPiece, type: ArmorType) => {
  return piece.type === ArmorType.ALL || piece.type === type
}

const filterExclusions = (piece: ArmorPiece, exclusionNames: string[]) => {
  return !exclusionNames.includes(piece.name)
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
  // find generic slot charms
  const genericSlotCharms: Charm[] = []
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
      genericSlotCharms.push(newC)
    }
  }

  // build list of charms with wanted skills or with slots
  const result = charms
    .filter(x => filterHasSkill(x, skills))
    .concat(...genericSlotCharms)

  // return list with dummy charm if there are no pieces
  if (result.length === 0) {
    return [{
      ...DUMMY_PIECE,
      category: EquipmentCategory.CHARM,
    }]
  }

  return result
}

const applyArmorFilter = (
  pieces: ArmorPiece[],
  rarity: Rarity,
  type: ArmorType,
  category: EquipmentCategory,
  pin: EquipmentMin | undefined,
  exclusions: EquipmentMin[],
  skills: SkillActivation[],
) => {
  if (pin) return [pieces.find(x => x.name === pin.name)!]

  const excludedNames = exclusions.map(e => e.name)

  const rarityFiltered = applyRarityFilter(pieces, rarity) as ArmorPiece[]
  const typeFiltered = rarityFiltered.filter(p => filterType(p, type))
  const exclusionFiltered = typeFiltered.filter(p => filterExclusions(p, excludedNames))
  const sorted = exclusionFiltered.sort((a, b) => b.defense.max - a.defense.max)

  // find generic slot pieces with highest defense
  const genericSlotPieces: ArmorPiece[] = []
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
        isGeneric: true,
      }
      if (filterExclusions(p, excludedNames)) genericSlotPieces.push(p)
    }
  }

  // find piece with torso up with highest defense
  const torsoUpPieces: ArmorPiece[] = [sorted.find(p => p.skills.has(TORSO_UP_ID))]
    .filter(x => x !== undefined)
    .map(x => {
      const renamed: ArmorPiece = {
        ...x!,
        name: 'Torso Up Piece',
        isGeneric: true,
      }
      return renamed
    })
    .filter(x => filterExclusions(x, excludedNames)) as ArmorPiece[]

  // build list of pieces with wanted skills, with slots, or with torso up
  const result = sorted
    .filter(x => filterHasSkill(x, skills))
    .concat(...genericSlotPieces)
    .concat(...torsoUpPieces)

  // return list with dummy element if there are no pieces
  if (result.length === 0) {
    return [{
      ...DUMMY_PIECE,
      type,
      category,
    }]
  }

  return result
}

export {
  filterType,
  filterRarity,
  filterHasSkill,
  applyRarityFilter,
  applyCharmFilter,
  applyArmorFilter,
}
