import Defense from './Defense'
import ArmorType from './ArmorType'
import Resistance from './Resistance'
import Equipment from './Equipment'
import SkillsMap from './SkillsMap'

export default interface ArmorPiece extends Equipment {
  type: ArmorType;
  defense: Defense;
  resistance: Resistance;
  skills: SkillsMap;
}
