import Decoration from '../../data-provider/models/equipment/Decoration'
import EquipmentSkillsMin from '../../data-provider/models/equipment/EquipmentSkillsMin'

export default interface DecoEvaluation {
    skills: EquipmentSkillsMin,
    decos: Decoration[],
    serialized?: string,
}
