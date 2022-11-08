import ArmorPiece from '../../data-provider/models/equipment/ArmorPiece'
import Charm from '../../data-provider/models/equipment/Charm'
import Decoration from '../../data-provider/models/equipment/Decoration'
import SkillActivationMap from '../../data-provider/models/skills/SkillActivationMap'
import SkillNameMap from '../../data-provider/models/skills/SkillNameMap'

/** includes all available data (armors pieces, decorations, charms) */
export default interface DataInput {
    head: ArmorPiece[];
    chest: ArmorPiece[];
    arms: ArmorPiece[];
    waist: ArmorPiece[];
    legs: ArmorPiece[];
    decorations: Decoration[];
    charms: Charm[];
    skillName: SkillNameMap;
    skillActivation: SkillActivationMap;
}
