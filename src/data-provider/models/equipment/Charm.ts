import Equipment from './Equipment'
import EquipmentSkills from './EquipmentSkills'
import SkilledItem from './SkilledItem'

export default interface Charm extends Equipment, SkilledItem {
    skills: EquipmentSkills,
}
