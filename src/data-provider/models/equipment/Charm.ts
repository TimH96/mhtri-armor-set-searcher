import Equipment from './Equipment'
import EquipmentSkills from './EquipmentSkills'

export default interface Charm extends Equipment {
    skills: EquipmentSkills
}
