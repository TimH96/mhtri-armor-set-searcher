import SkillActivationMap from '../../data-provider/models/skills/SkillActivationMap'
import SkillNameMap from '../../data-provider/models/skills/SkillNameMap'

export default interface StaticSkillData {
    skillName: SkillNameMap,
    skillActivation: SkillActivationMap,
    skillCategories: string[],
}
