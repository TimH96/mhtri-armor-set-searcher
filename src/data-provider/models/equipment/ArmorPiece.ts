import Defense from './Defense'
import ArmorType from './ArmorType'
import Resistance from './Resistance'
import Equipment from './Equipment'
import SkilledItem from './SkilledItem'

export default interface ArmorPiece extends Equipment, SkilledItem {
  type: ArmorType;
  defense: Defense;
  resistance: Resistance;
}
