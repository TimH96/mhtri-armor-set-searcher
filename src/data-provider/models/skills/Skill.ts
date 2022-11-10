import GameID from '../GameId'
import SkillMin from './SkillMin'

export default interface Skill extends SkillMin {
    id: GameID,
    name: string,
}
