import Equipment from './Equipment'
import SkillsList from './SkillsList'

export default interface Charm extends Equipment {
    skillsList: SkillsList
}
