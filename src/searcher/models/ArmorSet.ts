import { TORSO_UP_ID } from '../../data-provider/data-provider.module'
import Defense from '../../data-provider/models/equipment/Defense'
import EquipmentCategory from '../../data-provider/models/equipment/EquipmentCategory'
import EquipmentSkills from '../../data-provider/models/equipment/EquipmentSkills'
import Resistance from '../../data-provider/models/equipment/Resistance'
import Evaluation from './Evaluation'
import SkillActivationMap from '../../data-provider/models/skills/SkillActivationMap'
import ArmorPiece from '../../data-provider/models/equipment/ArmorPiece'
import Decoration from '../../data-provider/models/equipment/Decoration'
import Charm from '../../data-provider/models/equipment/Charm'

export default class ArmorSet {
  readonly head: ArmorPiece
  readonly chest: ArmorPiece
  readonly arms: ArmorPiece
  readonly waist: ArmorPiece
  readonly legs: ArmorPiece
  readonly charm: Charm
  decorations: Decoration[] = []

  evaluation: Evaluation

  torsoUpCount: number = 0

  private activationGetter: () => SkillActivationMap

  constructor (components: {
    head: ArmorPiece,
    chest: ArmorPiece,
    arms: ArmorPiece,
    waist: ArmorPiece,
    legs: ArmorPiece,
    charm: Charm,
  }, activationGetter: () => SkillActivationMap) {
    this.head = components.head
    this.chest = components.chest
    this.arms = components.arms
    this.waist = components.waist
    this.legs = components.legs
    this.charm = components.charm
    this.activationGetter = activationGetter
    this.evaluation = this.evaluate()
  }

  getPieces (): ArmorPiece[] {
    return [
      this.head,
      this.chest,
      this.arms,
      this.waist,
      this.legs,
    ]
  }

  evaluate (): Evaluation {
    const totalSkills: EquipmentSkills = new Map()
    const totalDefense: Defense = { base: 0, max: 0 }
    let totalResistance: Resistance = [0, 0, 0, 0, 0]
    let torsoUpCount = 0

    // iterate over all pieces other than charm
    // order matters here because of torso up!
    for (const piece of [this.head, this.arms, this.waist, this.legs, this.chest]) {
      totalDefense.base += piece.defense.base
      totalDefense.max += piece.defense.max
      totalResistance = piece.resistance.map((res, i) => res + totalResistance[i])

      if (piece.skills.get(TORSO_UP_ID)) {
        torsoUpCount++
        continue
      }

      for (const [sId, sVal] of piece.skills) {
        const currentS = totalSkills.get(sId)
        const processedVal = piece.category === EquipmentCategory.CHEST
          ? sVal * (torsoUpCount + 1)
          : sVal
        const newPoints = currentS
          ? processedVal + currentS
          : processedVal
        totalSkills.set(sId, newPoints)
      }
    }

    // save torso up count
    this.torsoUpCount = torsoUpCount

    // add skills from charm
    for (const [sId, sVal] of this.charm.skills) {
      const currentS = totalSkills.get(sId)
      const newPoints = currentS
        ? sVal + currentS
        : sVal
      totalSkills.set(sId, newPoints)
    }

    // get activations
    const activations = []
    for (const [sId, sVal] of totalSkills) {
      if (Math.abs(sVal) < 10) {
        continue
      }

      const activationsOfSkill = this.activationGetter().get(sId)!
        .filter(act => {
          return act.isPositive
            ? sVal >= act.requiredPoints
            : sVal <= act.requiredPoints
        })
      activations.push(...activationsOfSkill)
    }

    // build, save and return evaluation result
    const thisEval: Evaluation = {
      torsoUpCount,
      skills: totalSkills,
      activations,
      defense: totalDefense,
      resistance: totalResistance,
    }
    this.evaluation = thisEval
    return thisEval
  }
}
