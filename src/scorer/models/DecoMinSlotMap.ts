import Decoration from '../../data-provider/models/equipment/Decoration'
import EquipmentSkills from '../../data-provider/models/equipment/EquipmentSkills'
import GameID from '../../data-provider/models/GameId'

function * decoVariationMinSlotsGenerator (
  decosOfSkill: Decoration[],
  skillId: GameID,
  requiredPoints: number,
  requiredSlots: number,
  existingPoints: number,
): Generator<number, void, undefined> {
  for (const deco of decosOfSkill) {
    const newExistingPoints = existingPoints + deco.skills.get(skillId)!
    const newRequiredSlots = requiredSlots + deco.requiredSlots

    if (newExistingPoints >= requiredPoints) {
      yield newRequiredSlots
    } else {
      yield * decoVariationMinSlotsGenerator(
        decosOfSkill,
        skillId,
        requiredPoints,
        newRequiredSlots,
        newExistingPoints,
      )
    }
  }
}

/** calculates and saves how many slots are required to get x points of a certain skill */
export default class DecoMinSlotMap {
  private static readonly DUMMY_SCORE = 1000

  private decorationsOfSkillMap: Map<GameID, Decoration[]> = new Map()
  private calculations: Map<GameID, Map<number, number>> = new Map()

  constructor (allDecos: Decoration[], wantedSkills: EquipmentSkills) {
    for (const w of wantedSkills) {
      const sId = w[0]

      // set decorations of skill
      const decosOfSkill = allDecos
        .filter(x => x.skills.get(sId) > 0)
        .sort((a, b) => b.skills.get(sId) - a.skills.get(sId))
      this.decorationsOfSkillMap.set(sId, decosOfSkill)

      // init calculation map of that skill
      this.calculations.set(sId, new Map())
    }
  }

  private calculateMinRequiredSlots (skillId: GameID, skillPoints: number): number {
    const decosOfSkill = this.decorationsOfSkillMap.get(skillId)!
    if (decosOfSkill.length === 0) return DecoMinSlotMap.DUMMY_SCORE

    let minRequiredSlots = DecoMinSlotMap.DUMMY_SCORE
    for (const reqSlots of decoVariationMinSlotsGenerator(decosOfSkill, skillId, skillPoints, 0, 0)) {
      if (reqSlots < minRequiredSlots) minRequiredSlots = reqSlots
    }

    return minRequiredSlots
  }

  getMinRequiredSlotsForSkill (skillId: GameID, skillPoints: number): number {
    const m = this.calculations.get(skillId)!

    if (skillPoints <= 0) return 0
    if (m.has(skillPoints)) return m.get(skillPoints)!

    const newCalc = this.calculateMinRequiredSlots(skillId, skillPoints)
    m.set(skillPoints, newCalc)
    return newCalc
  }
}
