import Defense from './Defense'
import ArmorType from './ArmorType'
import Resistance from './Resistance'
import Slots from './Slots'

export default interface ArmorPiece {
  name: string;
  type: ArmorType;
  category: ArmorCategory;
  defense: Defense;
  resistance: Resistance;
  slots: Slots;
  skills: any;
}
