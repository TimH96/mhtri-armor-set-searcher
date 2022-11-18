import Decoration from '../../data-provider/models/equipment/Decoration'
import EquipmentSkills from '../../data-provider/models/equipment/EquipmentSkills'

export default interface DecoPermutation {
    skills: EquipmentSkills,
    decos: Decoration[],
    score: number,
}
