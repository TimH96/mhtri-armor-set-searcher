import { TORSO_UP_ID } from '../../data-provider/data-provider.module'
import EquipmentCategory from '../../data-provider/models/equipment/EquipmentCategory'
import EquipmentSkills from '../../data-provider/models/equipment/EquipmentSkills'
import ScoredSkilledEquipment from './ScoredSkilledEquipment'

export default class ArmorEvaluation {
  equipment: ScoredSkilledEquipment[]
  skills: EquipmentSkills = new EquipmentSkills()
  score: number = 0
  totalSlots: number = 0
  torsoUp: number = 0

  constructor (
    equipment: ScoredSkilledEquipment[],
    skills?: EquipmentSkills,
    score?: number,
    totalSlots?: number,
    torsoUp?: number,
  ) {
    this.equipment = equipment
    if (skills) this.skills = skills
    if (score) this.score = score
    if (totalSlots) this.totalSlots = totalSlots
    if (torsoUp) this.torsoUp = torsoUp
  }

  getSlots () {
    return this.equipment
      .map(x => x.slots)
      .filter(x => x > 0)
  }

  getSlotsExceptChest () {
    return this.equipment
      .filter(x => x.category !== EquipmentCategory.CHEST)
      .map(x => x.slots)
      .filter(x => x > 0)
  }

  copy () {
    return new ArmorEvaluation(
      this.equipment.map(x => x),
      new EquipmentSkills(this.skills),
      this.score,
      this.totalSlots,
      this.torsoUp,
    )
  }

  addPiece (piece: ScoredSkilledEquipment) {
    if (piece.skills.has(TORSO_UP_ID)) this.torsoUp++
    else {
      if (piece.category === EquipmentCategory.CHEST && this.torsoUp > 0) {
        for (const [k, v] of piece.skills) {
          this.skills.add(k, v * (this.torsoUp + 1))
        }
      } else {
        this.skills.addSkills(piece.skills)
      }
    }
    this.equipment[piece.category] = piece
    this.score = this.score + piece.score
    this.totalSlots = this.totalSlots + piece.slots
  }
}
