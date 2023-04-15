import EquipmentCategory from './EquipmentCategory'
import EquipmentMin from './EquipmentMin'
import Rarity from './Rarity'
import Slots from './Slots'

export default interface Equipment extends EquipmentMin {
  name: string;
  slots: Slots;
  category: EquipmentCategory;
  rarity: Rarity;
}
