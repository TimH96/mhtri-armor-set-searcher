import Decoration from '../../data-provider/models/equipment/Decoration'
import EquipmentSkills from '../../data-provider/models/equipment/EquipmentSkills'

export default interface DecoEvaluation {
    skills: EquipmentSkills,
    decos: Decoration[],
    serialized?: string,
}
