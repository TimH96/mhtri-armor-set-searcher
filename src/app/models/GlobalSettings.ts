import ArmorType from '../../data-provider/models/equipment/ArmorType'
import Slots from '../../data-provider/models/equipment/Slots'

export default interface GlobalSettings {
  armorType: ArmorType;
  weaponSlots: Slots;
}
