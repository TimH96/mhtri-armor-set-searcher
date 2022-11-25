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
import EquipmentCategory from '../../data-provider/models/equipment/EquipmentCategory'

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
    const chest = armorEval.equipment[EquipmentCategory.CHEST] as unknown as ArmorPiece

    this.chest = armorEval.torsoUp > 0 ? ArmorSet.applyTorsoUpToChest(chest, armorEval.torsoUp) : chest
    this.head = armorEval.equipment[EquipmentCategory.HEAD] as unknown as ArmorPiece
    this.arms = armorEval.equipment[EquipmentCategory.ARMS] as unknown as ArmorPiece
    this.waist = armorEval.equipment[EquipmentCategory.WAIST] as unknown as ArmorPiece
    this.legs = armorEval.equipment[EquipmentCategory.LEGS] as unknown as ArmorPiece
    this.charm = armorEval.equipment[EquipmentCategory.CHARM] as unknown as Charm
    this.decos = decoEval.decos
    this.evaluation = this.evaluate(armorEval, decoEval, skillActivations)
  }

  private static applyTorsoUpToChest (chest: ArmorPiece, torsoUp: number): ArmorPiece {
    const newSkills = new EquipmentSkills(chest.skills)
    newSkills.multiply(torsoUp + 1)
    return {
      ...chest,
      skills: newSkills,
    }
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
    const decoSkills = new EquipmentSkills()
    decoEval.decos.forEach(d => decoSkills.addSkills(d.skills))
    const skills = new EquipmentSkills(armorEval.skills)
    skills.addSkills(new EquipmentSkills(decoSkills))

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
      torsoUp: armorEval.torsoUp,
    }
    this.evaluation = thisEval
    return thisEval
  }
}
