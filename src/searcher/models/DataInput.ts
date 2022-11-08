import ArmorPiece from '../../data-provider/models/equipment/ArmorPiece'
import Charm from '../../data-provider/models/equipment/Charm'
import Decoration from '../../data-provider/models/equipment/Decoration'

/** includes all available data (armors pieces, decorations, charms) */
export default interface DataInput {
    head: ArmorPiece[];
    chest: ArmorPiece[];
    arms: ArmorPiece[];
    waist: ArmorPiece[];
    legs: ArmorPiece[];
    decorations: Decoration[];
    charms: Charm[];
}
