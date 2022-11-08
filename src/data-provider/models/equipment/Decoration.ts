import EquipmentSkills from './EquipmentSkills'
import Slots from './Slots'

export default interface Decoration {
  name: string;
  requiredSlots: Slots;
  skills: EquipmentSkills;
}
