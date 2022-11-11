import EquipmentSkillsMin from './EquipmentSkillsMin'
import Rarity from './Rarity'

export default interface SkilledItem {
    rarity: Rarity,
    skills: EquipmentSkillsMin,
}
