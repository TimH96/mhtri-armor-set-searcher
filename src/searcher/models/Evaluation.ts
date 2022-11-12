import EquipmentSkillsMin from '../../data-provider/models/equipment/EquipmentSkillsMin'
import SkillActivation from '../../data-provider/models/skills/SkillActivation'

export default interface Evaluation {
  torsoUpCount: number;
  skills: EquipmentSkillsMin;
  activations: SkillActivation[];
}
