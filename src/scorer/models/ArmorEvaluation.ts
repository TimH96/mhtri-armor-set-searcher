import EquipmentSkills from '../../data-provider/models/equipment/EquipmentSkills'
import ScoredSkilledEquipment from './ScoredSkilledEquipment'

export default class ArmorEvaluation {
  equipment: ScoredSkilledEquipment[]
  skills: EquipmentSkills = new EquipmentSkills()
  score: number = 0

  constructor (
    equipment: ScoredSkilledEquipment[],
    skills?: EquipmentSkills,
    score?: number,
  ) {
    this.equipment = equipment
    if (skills) this.skills = skills
    if (score) this.score = score
  }

  getSlots () {
    return this.equipment
      .map(x => x.slots)
      .filter(x => x > 0)
  }

  copy () {
    return new ArmorEvaluation(
      this.equipment,
      new EquipmentSkills(this.skills),
      this.score,
    )
  }

  addPiece (piece: ScoredSkilledEquipment) {
    this.skills.addSkills(piece.skills)
    this.equipment[piece.category] = piece
    this.score = this.score + piece.score
  }
}
