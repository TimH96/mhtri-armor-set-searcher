import EquipmentCategory from './EquipmentCategory'
import Slots from './Slots'

export default interface Equipment {
    name: string;
    slots: Slots;
    category: EquipmentCategory;
}
