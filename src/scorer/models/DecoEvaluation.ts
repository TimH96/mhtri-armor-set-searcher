import Decoration from '../../data-provider/models/equipment/Decoration'
import EquipmentSkills from '../../data-provider/models/equipment/EquipmentSkills'
import DecoPermutation from './DecoPermutation'

export default class DecoEvaluation implements DecoPermutation {
  decos: Decoration[] = []
  skills: EquipmentSkills = new EquipmentSkills()
  score: number = 0

  constructor (
    decos?: Decoration[],
    skills?: EquipmentSkills,
    score?: number,
  ) {
    if (decos) this.decos = decos
    if (skills) this.skills = skills
    if (score) this.score = score
  }

  copy () {
    return new DecoEvaluation(
      this.decos.map(x => x),
      new EquipmentSkills(this.skills),
      this.score,
    )
  }

  addPerm (perm: DecoPermutation) {
    this.skills.addSkills(perm.skills)
    this.decos.push(...perm.decos)
    this.score = this.score + perm.score
  }
}
