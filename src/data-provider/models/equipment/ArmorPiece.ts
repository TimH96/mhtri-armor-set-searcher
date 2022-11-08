import Defense from './Defense'
import ArmorType from './ArmorType'
import Resistance from './Resistance'
import Equipment from './Equipment'
import SkillsList from './SkillsList'

export default interface ArmorPiece extends Equipment {
  type: ArmorType;
  defense: Defense;
  resistance: Resistance;
  skillsList: SkillsList;
}
