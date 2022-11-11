import Rarity from './Rarity'
import SkilledItem from './SkilledItem'
import Slots from './Slots'

export default interface Decoration extends SkilledItem {
  name: string;
  requiredSlots: Slots;
  rarity: Rarity;
}
