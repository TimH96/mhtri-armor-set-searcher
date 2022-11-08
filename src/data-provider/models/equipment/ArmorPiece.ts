import Defense from './Defense'
import ArmorType from './ArmorType'
import Resistance from './Resistance'
import Equipment from './Equipment'
import Skills from './Skills'

export default interface ArmorPiece extends Equipment {
  type: ArmorType;
  defense: Defense;
  resistance: Resistance;
  skills: Skills;
}
