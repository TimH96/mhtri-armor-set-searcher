import Slots from '../../data-provider/models/equipment/Slots'
import SkillActivation from '../../data-provider/models/skills/SkillActivation'

export default interface SearchConstraints {
    weaponSlots: Slots;
    skillActivations: SkillActivation[];
}
