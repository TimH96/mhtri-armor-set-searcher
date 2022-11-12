import Defense from '../../data-provider/models/equipment/Defense'
import EquipmentSkillsMin from '../../data-provider/models/equipment/EquipmentSkillsMin'
import Resistance from '../../data-provider/models/equipment/Resistance'
import SkillActivation from '../../data-provider/models/skills/SkillActivation'

export default interface Evaluation {
  torsoUpCount: number;
  skills: EquipmentSkillsMin;
  activations: SkillActivation[];
  defense: Defense;
  resistance: Resistance;
}
