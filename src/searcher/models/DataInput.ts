import ArmorPiece from "../../data-provider/models/equipment/ArmorPiece";
import Charm from "../../data-provider/models/equipment/Charm";

/** includes all available data (armors pieces, decorations, charms) */
export default interface DataInput {
    head: ArmorPiece[];
    chest: ArmorPiece[];
    arms: ArmorPiece[];
    waist: ArmorPiece[];
    legs: ArmorPiece[];
    decorations: any; // TODO
    charms: Charm[];
}