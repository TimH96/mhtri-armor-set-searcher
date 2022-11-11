import EquipmentCategory from './EquipmentCategory'
import Rarity from './Rarity'
import Slots from './Slots'

export default interface Equipment {
  name: string;
  slots: Slots;
  category: EquipmentCategory;
  rarity: Rarity;
}
