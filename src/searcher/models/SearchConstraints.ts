import ArmorType from '../../data-provider/models/equipment/ArmorType'
import Rarity from '../../data-provider/models/equipment/Rarity'
import Slots from '../../data-provider/models/equipment/Slots'
import SkillActivation from '../../data-provider/models/skills/SkillActivation'

export default interface SearchConstraints {
    weaponSlots: Slots;
    armorType: ArmorType;
    armorRarity: Rarity,
    decoRarity: Rarity,
    skillActivations: SkillActivation[];
    limit: number;
}
