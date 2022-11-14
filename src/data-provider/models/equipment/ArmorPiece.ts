import Defense from './Defense'
import ArmorType from './ArmorType'
import Resistance from './Resistance'
import SkilledEquipment from './SkilledEquipment'

export default interface ArmorPiece extends SkilledEquipment {
  type: ArmorType;
  defense: Defense;
  resistance: Resistance;
}
