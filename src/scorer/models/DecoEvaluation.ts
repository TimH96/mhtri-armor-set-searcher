import Decoration from '../../data-provider/models/equipment/Decoration'
import EquipmentSkills from '../../data-provider/models/equipment/EquipmentSkills'
import Slots from '../../data-provider/models/equipment/Slots'
import DecoMinSlotMap from './DecoMinSlotMap'
import DecoPermutation from './DecoPermutation'

export default class DecoEvaluation {
  decoMinSlotMap: DecoMinSlotMap
  unusedSlotsSum: number
  missingSkills: EquipmentSkills
  decos: Decoration[] = []
  requiredSlots: number = 0

  constructor (
    decoMinSlotMap: DecoMinSlotMap,
    unusedSlotsSum: number,
    missingSkills: EquipmentSkills,
    decos?: Decoration[],
    requiredSlots?: number,
  ) {
    this.decoMinSlotMap = decoMinSlotMap
    this.unusedSlotsSum = unusedSlotsSum
    this.missingSkills = missingSkills
    if (decos) this.decos = decos
    this.requiredSlots = requiredSlots || this.calculateRequiredSlots()
  }

  copy () {
    return new DecoEvaluation(
      this.decoMinSlotMap,
      this.unusedSlotsSum,
      new EquipmentSkills(this.missingSkills),
      this.decos.map(x => x),
      this.requiredSlots,
    )
  }

  calculateRequiredSlots (): number {
    let newRequiredSlots: number = 0
    for (const w of this.missingSkills) {
      const sId = w[0]
      const sVal = w[1]
      newRequiredSlots += this.decoMinSlotMap.getMinRequiredSlotsForSkill(sId, sVal)
    }
    this.requiredSlots = newRequiredSlots
    return newRequiredSlots
  }

  addPerm (perm: DecoPermutation, slotLevel: Slots) {
    this.unusedSlotsSum -= slotLevel
    this.decos.push(...perm.decos)

    // use custom loop instead of EquipmentSkills.substractSkills and DecoEvaluation.calculateRequiredSlots
    // to save on processing because this method is called a lot
    let newRequiredSlots: number = 0
    for (const w of this.missingSkills) {
      const sId = w[0]
      const sVal = w[1]

      const newVal = sVal - perm.skills.get(sId)
      this.missingSkills.set(sId, newVal)
      newRequiredSlots += this.decoMinSlotMap.getMinRequiredSlotsForSkill(sId, newVal)
    }

    this.requiredSlots = newRequiredSlots
  }
}
