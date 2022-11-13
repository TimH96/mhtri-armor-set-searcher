import { TORSO_UP_ID } from '../../data-provider/data-provider.module'
import Defense from '../../data-provider/models/equipment/Defense'
import EquipmentCategory from '../../data-provider/models/equipment/EquipmentCategory'
import EquipmentSkills from '../../data-provider/models/equipment/EquipmentSkills'
import Resistance from '../../data-provider/models/equipment/Resistance'
import Evaluation from './Evaluation'
import ArmorPiece from '../../data-provider/models/equipment/ArmorPiece'
import Decoration from '../../data-provider/models/equipment/Decoration'
import Charm from '../../data-provider/models/equipment/Charm'
import PartialEvaluation from './PartialEvaluation'
import SkillActivationMap from '../../data-provider/models/skills/SkillActivationMap'
import SkillActivation from '../../data-provider/models/skills/SkillActivation'

export default class ArmorSet {
  readonly head: ArmorPiece
  readonly chest: ArmorPiece
  readonly arms: ArmorPiece
  readonly waist: ArmorPiece
  readonly legs: ArmorPiece
  readonly charm: Charm
  decorations: Decoration[] = []

  partial: PartialEvaluation
  evaluation?: Evaluation

  torsoUpCount: number = 0

  constructor (components: {
    head: ArmorPiece,
    chest: ArmorPiece,
    arms: ArmorPiece,
    waist: ArmorPiece,
    legs: ArmorPiece,
    charm: Charm,
  }) {
    this.head = components.head
    this.chest = components.chest
    this.arms = components.arms
    this.waist = components.waist
    this.legs = components.legs
    this.charm = components.charm
    this.partial = this.partialEvaluate()
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

  addDecorations (decorations: Decoration[]): void {
    this.decorations = decorations
  }

  evaluate (activations: SkillActivationMap): Evaluation {
    const totalSkills = new Map(this.partial.skills.entries())
    const totalDefense: Defense = { base: 0, max: 0 }
    let totalResistance: Resistance = [0, 0, 0, 0, 0]

    // get defense stats
    for (const piece of [this.head, this.arms, this.waist, this.legs, this.chest]) {
      totalDefense.base += piece.defense.base
      totalDefense.max += piece.defense.max
      totalResistance = piece.resistance.map((res, i) => res + totalResistance[i])
    }

    // TODO implement
    // add skills from decorations
    // for (const deco of this.decorations) {
    //  for (const [sId, sVal] of deco.skills) {
    //    const currentS = totalSkills.get(sId)
    //    const processedVal = deco.slottedPiece === EquipmentCategory.CHEST && this.torsoUpCount
    //      ? sVal.points * (torsoUpCount + 1)
    //      : sVal.points
    //    const newPoints = currentS
    //      ? processedVal + currentS.points
    //      : processedVal
    //    totalSkills.set(sId, { points: newPoints })
    //  }
    // }

    // get activations
    const a: SkillActivation[] = []
    for (const [sId, sVal] of totalSkills) {
      if (Math.abs(sVal) < 10) {
        continue
      }

      const activationsOfSkill = activations.get(sId)!
        .filter(act => {
          return act.isPositive
            ? sVal >= act.requiredPoints
            : sVal <= act.requiredPoints
        })
      a.push(...activationsOfSkill)
    }

    // build, save and return model
    const thisEval: Evaluation = {
      ...this.partial,
      defense: totalDefense,
      resistance: totalResistance,
      activations: a,
    }
    this.evaluation = thisEval
    return thisEval
  }

  /** only evaluate skills of set */
  partialEvaluate (): PartialEvaluation {
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

    // build, save and return evaluation result
    const thisEval: PartialEvaluation = {
      torsoUpCount,
      skills: totalSkills,
    }
    this.partial = thisEval
    return thisEval
  }
}
