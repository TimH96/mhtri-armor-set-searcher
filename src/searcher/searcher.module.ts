import ArmorPiece from '../data-provider/models/equipment/ArmorPiece'
import ArmorType from '../data-provider/models/equipment/ArmorType'
import Charm from '../data-provider/models/equipment/Charm'
import Decoration from '../data-provider/models/equipment/Decoration'
import Rarity from '../data-provider/models/equipment/Rarity'
import SkilledItem from '../data-provider/models/equipment/SkilledItem'
import SkillActivation from '../data-provider/models/skills/SkillActivation'
import SearchConstraints from './models/SearchConstraints'

const filterType = (piece: ArmorPiece, type: ArmorType) => {
  return piece.type === ArmorType.ALL || piece.type === type
}

const filterRarity = (piece: SkilledItem, rarity: Rarity) => {
  return piece.rarity <= rarity
}

const filterHasSkill = (piece: SkilledItem, desiredSkills: SkillActivation[]) => {
  return desiredSkills.some((act) => {
    const s = piece.skills.get(act.requiredSkill)
    return s && s > 0
  })
}

const search = async (
  armorPieces: ArmorPiece[][],
  decorations: Decoration[],
  charms: Charm[],
  constraints: SearchConstraints,
) => {
  console.log(constraints)

  armorPieces.map(x => x.map(y => filterHasSkill(y, constraints.skillActivations)))
  decorations.map(y => filterHasSkill(y, constraints.skillActivations))
  charms.map(y => filterHasSkill(y, constraints.skillActivations))
}

export { search }
