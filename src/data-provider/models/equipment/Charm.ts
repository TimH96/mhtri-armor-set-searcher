import Equipment from './Equipment'
import SkillsMap from './SkillsMap'

export default interface Charm extends Equipment {
    skills: SkillsMap
}
