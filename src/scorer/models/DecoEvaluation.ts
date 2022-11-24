import Decoration from '../../data-provider/models/equipment/Decoration'
import EquipmentSkills from '../../data-provider/models/equipment/EquipmentSkills'
import Slots from '../../data-provider/models/equipment/Slots'
import DecoPermutation from './DecoPermutation'

export default class DecoEvaluation implements DecoPermutation {
  unusedSlotsSum: number
  decos: Decoration[] = []
  skills: EquipmentSkills = new EquipmentSkills()
  score: number = 0

  constructor (
    unusedSlotsSum: number,
    decos?: Decoration[],
    skills?: EquipmentSkills,
    score?: number,
  ) {
    this.unusedSlotsSum = unusedSlotsSum
    if (decos) this.decos = decos
    if (skills) this.skills = skills
    if (score) this.score = score
  }

  copy () {
    return new DecoEvaluation(
      this.unusedSlotsSum,
      this.decos.map(x => x),
      new EquipmentSkills(this.skills),
      this.score,
    )
  }

  addPerm (perm: DecoPermutation, slotLevel: Slots) {
    this.unusedSlotsSum -= slotLevel
    this.skills.addSkills(perm.skills)
    this.decos.push(...perm.decos)
    this.score = this.score + perm.score
  }
}
