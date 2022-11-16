import Defense from '../../data-provider/models/equipment/Defense'
import EquipmentSkills from '../../data-provider/models/equipment/EquipmentSkills'
import Resistance from '../../data-provider/models/equipment/Resistance'
import SkillActivation from '../../data-provider/models/skills/SkillActivation'

export default interface Evaluation {
  skills: EquipmentSkills;
  activations: SkillActivation[];
  defense: Defense;
  resistance: Resistance;
}
