import Decoration from './Decoration'
import EquipmentCategory from './EquipmentCategory'

export default interface EquippedDecoration extends Decoration {
    slottedPiece: EquipmentCategory,
}
