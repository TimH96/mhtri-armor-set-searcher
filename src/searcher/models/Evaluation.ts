import Defense from '../../data-provider/models/equipment/Defense'
import Resistance from '../../data-provider/models/equipment/Resistance'
import SkillActivation from '../../data-provider/models/skills/SkillActivation'
import PartialEvaluation from './PartialEvaluation'

export default interface Evaluation extends PartialEvaluation {
  activations: SkillActivation[];
  defense: Defense;
  resistance: Resistance;
}
