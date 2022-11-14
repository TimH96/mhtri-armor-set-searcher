import EquipmentSkills from '../../data-provider/models/equipment/EquipmentSkills'
import SkilledEquipment from '../../data-provider/models/equipment/SkilledEquipment'

export default class ArmorEvaluation {
  equipment: SkilledEquipment[]
  skills: EquipmentSkills = new EquipmentSkills()

  constructor (equipment: SkilledEquipment[], skills?: EquipmentSkills) {
    this.equipment = equipment
    if (skills) this.skills = skills
  }

  copy () {
    return new ArmorEvaluation(
      this.equipment,
      new EquipmentSkills(this.skills),
    )
  }

  addPiece (piece: SkilledEquipment) {
    this.skills.addSkills(piece.skills)
    this.equipment[piece.category] = piece
  }
}
