import GameID from '../GameId'

export default interface SkillActivation {
  id: GameID,
  name: string,
  requiredPoints: number,
  requiredSkill: GameID,
  isPositive: boolean,
  category: GameID,
}
