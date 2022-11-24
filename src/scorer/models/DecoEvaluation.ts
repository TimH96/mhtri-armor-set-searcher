import Decoration from '../../data-provider/models/equipment/Decoration'
import EquipmentSkills from '../../data-provider/models/equipment/EquipmentSkills'
import Slots from '../../data-provider/models/equipment/Slots'
import DecoMinSlotMap from './DecoMinSlotMap'
import DecoPermutation from './DecoPermutation'

export default class DecoEvaluation {
  unusedSlotsSum: number
  missingSkills: EquipmentSkills
  decos: Decoration[] = []
  requiredSlots: number = 0

  constructor (
    unusedSlotsSum: number,
    missingSkills: EquipmentSkills,
    decos?: Decoration[],
    requiredSlots?: number,
  ) {
    this.unusedSlotsSum = unusedSlotsSum
    this.missingSkills = missingSkills
    if (decos) this.decos = decos
    if (requiredSlots) this.requiredSlots = requiredSlots
  }

  copy () {
    return new DecoEvaluation(
      this.unusedSlotsSum,
      new EquipmentSkills(this.missingSkills),
      this.decos.map(x => x),
      this.requiredSlots,
    )
  }

  addPerm (perm: DecoPermutation, slotLevel: Slots, decoMinSlotMap: DecoMinSlotMap) {
    this.unusedSlotsSum -= slotLevel
    this.decos.push(...perm.decos)

    let newRequiredSlots: number = 0
    for (const w of this.missingSkills) {
      const sId = w[0]
      const sVal = w[1]

      const newVal = sVal - perm.skills.get(sId)
      this.missingSkills.set(sId, newVal)
      newRequiredSlots += decoMinSlotMap.getMinRequiredSlotsForSkill(sId, newVal)
    }

    this.requiredSlots = newRequiredSlots
  }
}
