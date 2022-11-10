import EquipmentSkillsMin from './EquipmentSkillsMin'
import Slots from './Slots'

export default interface Decoration {
  name: string;
  requiredSlots: Slots;
  skills: EquipmentSkillsMin;
}
