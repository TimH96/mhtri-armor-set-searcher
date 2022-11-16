import SkilledEquipment from '../../data-provider/models/equipment/SkilledEquipment'

export default interface ScoredSkilledEquipment extends SkilledEquipment {
    score: number,
}
