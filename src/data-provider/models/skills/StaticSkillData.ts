import SkillActivationMap from './SkillActivationMap'
import SkillNameMap from './SkillNameMap'

export default interface StaticSkillData {
    skillName: SkillNameMap,
    skillActivation: SkillActivationMap,
    skillCategories: string[],
}
