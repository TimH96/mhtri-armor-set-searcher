import ArmorPiece from '../../data-provider/models/equipment/ArmorPiece'
import Decoration from '../../data-provider/models/equipment/Decoration'

export default interface StaticEquipmentData {
  armor: ArmorPiece[][];
  decorations: Decoration[];
}
