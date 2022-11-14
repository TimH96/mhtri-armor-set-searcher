import Decoration from '../../data-provider/models/equipment/Decoration'
import EquipmentSkills from '../../data-provider/models/equipment/EquipmentSkills'
import DecoPermutation from './DecoPermutation'

export default class DecoEvaluation {
  decos: Decoration[] = []
  skills: EquipmentSkills = new EquipmentSkills()

  constructor (decos?: Decoration[], skills?: EquipmentSkills) {
    if (decos) this.decos = decos
    if (skills) this.skills = skills
  }

  copy () {
    return new DecoEvaluation(
      this.decos,
      new EquipmentSkills(this.skills),
    )
  }

  addDecos (decos: DecoPermutation) {
    this.skills.addSkills(decos.skills)
    this.decos.push(...decos.decos)
  }
}
