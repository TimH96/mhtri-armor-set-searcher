import { TORSO_UP_ID } from '../../data-provider/data-provider.module'
import Defense from '../../data-provider/models/equipment/Defense'
import EquipmentSkills from '../../data-provider/models/equipment/EquipmentSkills'
import Resistance from '../../data-provider/models/equipment/Resistance'
import Evaluation from './Evaluation'
import ArmorPiece from '../../data-provider/models/equipment/ArmorPiece'
import Decoration from '../../data-provider/models/equipment/Decoration'
import Charm from '../../data-provider/models/equipment/Charm'
import SkillActivationMap from '../../data-provider/models/skills/SkillActivationMap'
import SkillActivation from '../../data-provider/models/skills/SkillActivation'

export default class ArmorSet {
  readonly head: ArmorPiece
  readonly chest: ArmorPiece
  readonly arms: ArmorPiece
  readonly waist: ArmorPiece
  readonly legs: ArmorPiece
  readonly charm: Charm
  readonly decos: Decoration[]

  evaluation: Evaluation

  torsoUpCount: number = 0

  constructor (components: {
    head: ArmorPiece,
    chest: ArmorPiece,
    arms: ArmorPiece,
    waist: ArmorPiece,
    legs: ArmorPiece,
    charm: Charm,
    decos: Decoration[],
  }, skillActivations: SkillActivationMap) {
    this.head = components.head
    this.chest = components.chest
    this.arms = components.arms
    this.waist = components.waist
    this.legs = components.legs
    this.charm = components.charm
    this.decos = components.decos
    this.evaluation = this.evaluate(skillActivations)
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

  evaluate (activations: SkillActivationMap): Evaluation {
    const totalSkills = new EquipmentSkills()
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
        totalSkills.add(sId, sVal)
      }
    }

    // save torso up count
    this.torsoUpCount = torsoUpCount

    // add skills from charm
    for (const [sId, sVal] of this.charm.skills) {
      totalSkills.add(sId, sVal)
    }

    // TODO account for torso up
    // add skills from decorations
    for (const deco of this.decos) {
      for (const [sId, sVal] of deco.skills) {
        totalSkills.add(sId, sVal)
      }
    }

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
      defense: totalDefense,
      resistance: totalResistance,
      activations: a,
      torsoUpCount,
      skills: totalSkills,
    }
    this.evaluation = thisEval
    return thisEval
  }
}
