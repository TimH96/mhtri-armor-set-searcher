import ArmorType from '../../data-provider/models/equipment/ArmorType'
import Rarity from '../../data-provider/models/equipment/Rarity'
import Slots from '../../data-provider/models/equipment/Slots'

export default interface GlobalSettings {
  armorType: ArmorType
  weaponSlots: Slots
  armorRarity: Rarity
  decoRarity: Rarity
  limit: number
}
