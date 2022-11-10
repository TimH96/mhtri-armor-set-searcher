import Defense from './Defense'
import ArmorType from './ArmorType'
import Resistance from './Resistance'
import Equipment from './Equipment'
import EquipmentSkillsMin from './EquipmentSkillsMin'

export default interface ArmorPiece extends Equipment {
  type: ArmorType;
  defense: Defense;
  resistance: Resistance;
  skills: EquipmentSkillsMin;
}
