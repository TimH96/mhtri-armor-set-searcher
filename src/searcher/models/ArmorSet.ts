import Defense from '../../data-provider/models/equipment/Defense'
import EquipmentSkills from '../../data-provider/models/equipment/EquipmentSkills'
import Resistance from '../../data-provider/models/equipment/Resistance'
import Evaluation from './Evaluation'
import ArmorPiece from '../../data-provider/models/equipment/ArmorPiece'
import Decoration from '../../data-provider/models/equipment/Decoration'
import Charm from '../../data-provider/models/equipment/Charm'
import SkillActivationMap from '../../data-provider/models/skills/SkillActivationMap'
import SkillActivation from '../../data-provider/models/skills/SkillActivation'
import ArmorEvaluation from '../../scorer/models/ArmorEvaluation'
import DecoEvaluation from '../../scorer/models/DecoEvaluation'

export default class ArmorSet {
  readonly head: ArmorPiece
  readonly chest: ArmorPiece
  readonly arms: ArmorPiece
  readonly waist: ArmorPiece
  readonly legs: ArmorPiece
  readonly charm: Charm
  readonly decos: Decoration[]

  evaluation: Evaluation

  constructor (
    armorEval: ArmorEvaluation,
    decoEval: DecoEvaluation,
    skillActivations: SkillActivationMap,
  ) {
    this.head = armorEval.equipment[0] as unknown as ArmorPiece
    this.chest = armorEval.equipment[1] as unknown as ArmorPiece
    this.arms = armorEval.equipment[2] as unknown as ArmorPiece
    this.waist = armorEval.equipment[3] as unknown as ArmorPiece
    this.legs = armorEval.equipment[4] as unknown as ArmorPiece
    this.charm = armorEval.equipment[5] as unknown as ArmorPiece
    this.decos = decoEval.decos
    this.evaluation = this.evaluate(armorEval, decoEval, skillActivations)
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

  evaluate (
    armorEval: ArmorEvaluation,
    decoEval: DecoEvaluation,
    activations: SkillActivationMap,
  ): Evaluation {
    const totalDefense: Defense = { base: 0, max: 0 }
    let totalResistance: Resistance = [0, 0, 0, 0, 0]

    // iterate over all armor pieces
    for (const piece of this.getPieces()) {
      totalDefense.base += piece.defense.base
      totalDefense.max += piece.defense.max
      totalResistance = piece.resistance.map((res, i) => res + totalResistance[i])
    }

    // get total skills
    const skills = new EquipmentSkills(armorEval.skills)
    skills.addSkills(new EquipmentSkills(decoEval.skills))

    // get activations
    const a: SkillActivation[] = []
    for (const [sId, sVal] of skills) {
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
      skills,
    }
    this.evaluation = thisEval
    return thisEval
  }
}
