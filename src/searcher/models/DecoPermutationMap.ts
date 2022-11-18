import EquipmentSkills from '../../data-provider/models/equipment/EquipmentSkills'
import DecoPermutation from '../../scorer/models/DecoPermutation'
import Slots from '../../data-provider/models/equipment/Slots'
import { cartesianProduct } from '../../helper/cartesian.helper'
import { pruneDecoPermutations } from '../../scorer/scorer.module'

export default class DecoPermutationMap {
  private decoPermutationMap: Map<string, DecoPermutation[]>
  private decoVariationsPerSlotLevel: Map<Slots, DecoPermutation[]>
  private wantedSkills: EquipmentSkills

  constructor (
    decoVariationsPerSlotLevel: Map<Slots, DecoPermutation[]>,
    wantedSkills: EquipmentSkills,
  ) {
    this.decoPermutationMap = new Map()
    this.decoPermutationMap.set('', [])
    this.decoVariationsPerSlotLevel = decoVariationsPerSlotLevel
    this.wantedSkills = wantedSkills
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

    // if recursed perm is empty simply return perm of that slot level
    if (y.length === 0) {
      this.decoPermutationMap.set(keyString, x)
      return x
    }

    // get cartesiean product of slot level perms and recursion of remaining key
    const product = cartesianProduct(x, y)
    const combined = product
      .map((perms) => {
        const p1 = perms[0]
        const p2 = perms[1]

        const newSkills = new EquipmentSkills(p1.skills)
        newSkills.addSkills(p2.skills)

        const newP: DecoPermutation = {
          score: p1.score + p2.score,
          decos: p1.decos.concat(...p2.decos),
          skills: newSkills,
        }

        return newP
      })

    // prune resulting perm list, save and return
    const pruned = pruneDecoPermutations(combined, this.wantedSkills)
    this.decoPermutationMap.set(keyString, pruned)
    return pruned
  }
}
