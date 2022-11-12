import Equipment from './Equipment'
import Slots from './Slots'

export default interface EquippedEquipment extends Equipment {
  usedSlots: Slots,
  remainingSlots: Slots,
}
