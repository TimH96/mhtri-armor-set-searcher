import GameID from "../GameId";

export default interface SkillActivation {
  name: string;
  requiredPoints: number;
  requiredSkill: GameID;
  isPositive: boolean;
}
