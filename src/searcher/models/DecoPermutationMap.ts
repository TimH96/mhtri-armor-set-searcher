import EquipmentSkills from '../../data-provider/models/equipment/EquipmentSkills'
import DecoPermutation from '../../scorer/models/DecoPermutation'
import Slots from '../../data-provider/models/equipment/Slots'

export default class DecoPermutationMap {
  decoPermutationMap: Map<string, DecoPermutation[]>
  private decoVariationsPerSlotLevel: Map<Slots, DecoPermutation[]>

  constructor (
    decoVariationsPerSlotLevel: Map<Slots, DecoPermutation[]>,
  ) {
    this.decoPermutationMap = new Map()
    this.decoPermutationMap.set('', [])
    this.decoVariationsPerSlotLevel = decoVariationsPerSlotLevel
  }

  get (slotList: Slots[]): DecoPermutation[] {
    const l = slotList.sort((a, b) => b - a)
    return this._get(l.join(''))
  }

  private _get (keyString: string): DecoPermutation[] {
    // return already computed permutation if it exists
    if (this.decoPermutationMap.has(keyString)) return this.decoPermutationMap.get(keyString)!

    // get new parts
    const ele = parseInt(keyString[0]) as Slots
    const sliced = keyString.slice(1)
    const x = this.decoVariationsPerSlotLevel.get(ele)!
    const y = this._get(sliced)

    // get new list, save it and return it
    const newL = this.combinePermutationLists(x, y)
    this.decoPermutationMap.set(keyString, newL)
    return newL
  }

  private combinePermutationLists (x: DecoPermutation[], y: DecoPermutation[]): DecoPermutation[] {
    if (x.length === 0) return y
    if (y.length === 0) return x

    const r = []
    for (const p1 of x) {
      for (const p2 of y) {
        const newSkills = new EquipmentSkills(p1.skills)
        newSkills.addSkills(p2.skills)

        const newP: DecoPermutation = {
          score: p1.score + p2.score,
          decos: p1.decos.concat(...p2.decos),
          skills: newSkills,
        }

        r.push(newP)
      }
    }

    return r
  }
}
