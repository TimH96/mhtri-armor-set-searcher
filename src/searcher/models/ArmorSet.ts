import { TORSO_UP_ID } from '../../data-provider/data-provider.module'
import EquippedArmorPiece from '../../data-provider/models/equipment/EquippedArmorPiece'
import Defense from '../../data-provider/models/equipment/Defense'
import EquipmentCategory from '../../data-provider/models/equipment/EquipmentCategory'
import EquipmentSkillsMin from '../../data-provider/models/equipment/EquipmentSkillsMin'
import EquippedDecoration from '../../data-provider/models/equipment/EquippedDecoration'
import Resistance from '../../data-provider/models/equipment/Resistance'
import EquippedCharm from '../../data-provider/models/equipment/EquippedCharm'
import Evaluation from './Evaluation'
import SkillActivationMap from '../../data-provider/models/skills/SkillActivationMap'

export default class ArmorSet {
  readonly head: EquippedArmorPiece
  readonly chest: EquippedArmorPiece
  readonly arms: EquippedArmorPiece
  readonly waist: EquippedArmorPiece
  readonly legs: EquippedArmorPiece
  readonly charm: EquippedCharm
  decorations: EquippedDecoration[] = []

  evaluation: Evaluation

  torsoUpCount: number = 0

  private activationGetter: () => SkillActivationMap

  constructor (components: {
    head: EquippedArmorPiece,
    chest: EquippedArmorPiece,
    arms: EquippedArmorPiece,
    waist: EquippedArmorPiece,
    legs: EquippedArmorPiece,
    charm: EquippedCharm,
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

  getPieces (): EquippedArmorPiece[] {
    return [
      this.head,
      this.chest,
      this.arms,
      this.waist,
      this.legs,
    ]
  }

  evaluate (): Evaluation {
    const totalSkills: EquipmentSkillsMin = new Map()
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
          ? sVal.points * (torsoUpCount + 1)
          : sVal.points
        const newPoints = currentS
          ? processedVal + currentS.points
          : processedVal
        totalSkills.set(sId, { points: newPoints })
      }
    }

    // save torso up count
    this.torsoUpCount = torsoUpCount

    // add skills from charm
    for (const [sId, sVal] of this.charm.skills) {
      const currentS = totalSkills.get(sId)
      const newPoints = currentS
        ? sVal.points + currentS.points
        : sVal.points
      totalSkills.set(sId, { points: newPoints })
    }

    // add skills from decorations
    for (const deco of this.decorations) {
      for (const [sId, sVal] of deco.skills) {
        const currentS = totalSkills.get(sId)
        const processedVal = deco.slottedPiece === EquipmentCategory.CHEST && this.torsoUpCount
          ? sVal.points * (torsoUpCount + 1)
          : sVal.points
        const newPoints = currentS
          ? processedVal + currentS.points
          : processedVal
        totalSkills.set(sId, { points: newPoints })
      }
    }

    // get activations
    const activations = []
    for (const [sId, sVal] of totalSkills) {
      if (Math.abs(sVal.points) < 10) {
        continue
      }

      const activationsOfSkill = this.activationGetter().get(sId)!
        .filter(act => {
          return act.isPositive
            ? sVal.points >= act.requiredPoints
            : sVal.points <= act.requiredPoints
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
