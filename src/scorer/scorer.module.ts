import Decoration from '../data-provider/models/equipment/Decoration'
import EquipmentSkills from '../data-provider/models/equipment/EquipmentSkills'
import DecoPermutation from './models/DecoPermutation'

const serializeSkillMap = (m: EquipmentSkills) => {
  return Array.from(m.entries())
    .sort(([aId, _a], [bId, _b]) => bId - aId)
    .map(([sId, sVal]) => `${sId}:${sVal}`)
    .join(',')
}

/** get score of a skill map relative to wanted skills */
const getScoreFromSkillMap = (m: EquipmentSkills, w: EquipmentSkills): number => {
  let score = 0
  for (const [sId] of w) {
    score += m.get(sId) || 0
  }

  return score
}

/** apply score to a list of decos */
const evaluateListOfDecos = (decos: Decoration[], wantedSkills: EquipmentSkills): DecoPermutation => {
  const skillMap: EquipmentSkills = new EquipmentSkills()
  decos.forEach(deco => skillMap.addSkills(deco.skills))
  const score = getScoreFromSkillMap(skillMap, wantedSkills)

  return {
    skills: skillMap,
    serialized: serializeSkillMap(skillMap),
    decos,
    score,
  }
}

/** returns a mapping of slot level to the amount of score it is worth */
const getDecoSlotScoreMap = (decoVariationsPerSlotLevel: DecoPermutation[][]): Map<number, number> => {
  const m = new Map()

  const slotValueArray = decoVariationsPerSlotLevel
    .map(variationsOfSlot => Math.max(...variationsOfSlot.map(x => x.score)))
    .map((score, i) => [i + 1, score])

  slotValueArray.forEach(([l, s]) => m.set(l, s))
  m.set(0, 0)

  return m
}

export {
  serializeSkillMap,
  getScoreFromSkillMap,
  evaluateListOfDecos,
  getDecoSlotScoreMap,
}
