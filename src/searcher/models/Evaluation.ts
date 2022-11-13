import Defense from '../../data-provider/models/equipment/Defense'
import Resistance from '../../data-provider/models/equipment/Resistance'
import SkillActivation from '../../data-provider/models/skills/SkillActivation'

export default interface Evaluation {
  activations: SkillActivation[];
  defense: Defense;
  resistance: Resistance;
}
