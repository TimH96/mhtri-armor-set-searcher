import EquipmentSkills from './EquipmentSkills'
import Rarity from './Rarity'

export default interface SkilledItem {
    rarity: Rarity,
    skills: EquipmentSkills,
}
