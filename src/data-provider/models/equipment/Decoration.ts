import EquipmentSkillsMin from './EquipmentSkillsMin'
import Rarity from './Rarity'
import Slots from './Slots'

export default interface Decoration {
  name: string;
  requiredSlots: Slots;
  skills: EquipmentSkillsMin;
  rarity: Rarity;
}
