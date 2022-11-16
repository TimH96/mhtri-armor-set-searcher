import Decoration from '../../data-provider/models/equipment/Decoration'
import EquipmentSkills from '../../data-provider/models/equipment/EquipmentSkills'
import DecoPermutation from './DecoPermutation'

export default class DecoEvaluation {
  decos: Decoration[] = []
  skills: EquipmentSkills = new EquipmentSkills()
  score: number = 0

  constructor (decos?: Decoration[], skills?: EquipmentSkills, score?: number) {
    if (decos) this.decos = decos
    if (skills) this.skills = skills
    if (score) this.score = score
  }

  copy () {
    return new DecoEvaluation(
      this.decos,
      new EquipmentSkills(this.skills),
      this.score,
    )
  }

  addDecos (decos: DecoPermutation) {
    this.skills.addSkills(decos.skills)
    this.decos.push(...decos.decos)
    this.score = this.score + decos.score
  }
}
