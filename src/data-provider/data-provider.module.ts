import ArmorPiece from './models/equipment/ArmorPiece'
import GameID from './models/GameId'
import SkillActivation from './models/skills/SkillActivation'
import SkillActivationMap from './models/skills/SkillActivationMap'
import SkillNameMap from './models/skills/SkillNameMap'

/** fetch from data directory */
const getRawData = async (url: string) => {
  return (await fetch(url)).json()
}

/** fetch and parse generic equipment data */
const getEquipmentData = async (url: string): Promise<ArmorPiece[]> => {
  const raw = await getRawData(url)
  return raw.map((rawPiece: any) => {
    const skillMap: Map<GameID, number> = new Map()
    for (const x in rawPiece.skills) {
      skillMap.set(parseInt(x), rawPiece.skills[x])
    }
    return {
      ...rawPiece,
      skills: skillMap,
    }
  })
}

/** get a list of all head armor pieces */
const getHead = async (): Promise<ArmorPiece[]> => {
  return getEquipmentData('./head.json')
}

/** get a list of all chest armor pieces */
const getChest = async (): Promise<ArmorPiece[]> => {
  return getRawData('./chest.json')
}

/** get a list of all arms armor pieces */
const getArms = async (): Promise<ArmorPiece[]> => {
  return getRawData('./arms.json')
}

/** get a list of all waist armor pieces */
const getWaist = async (): Promise<ArmorPiece[]> => {
  return getRawData('./waist.json')
}

/** get a list of all legs armor pieces */
const getLegs = async (): Promise<ArmorPiece[]> => {
  return getRawData('./legs.json')
}

const getDecorations = async () => {
  return getRawData('./decorations.json')
}

/** get a mapping of internal id to name for all skills */
const getSkillNameMap = async (): Promise<SkillNameMap> => {
  const raw = await getRawData('./skill-names')
  const map: Map<GameID, string> = new Map()
  for (const id in raw) {
    map.set(parseInt(id), raw[id])
  }
  return map
}

/** get a mapping of internal id of skill to all activations (positive and negative) of that skill */
const getSkillActivationMap = async (): Promise<SkillActivationMap> => {
  const raw = await getRawData('./skills')
  const map: Map<GameID, SkillActivation[]> = new Map()
  for (const id in raw) {
    const parsedId = parseInt(id)
    map.set(
      parsedId,
      raw[id].map((activation: any) => {
        return {
          ...activation,
          requiredSkill: parsedId,
        }
      }),
    )
  }
  return map
}

export {
  getHead,
  getChest,
  getArms,
  getWaist,
  getLegs,
  getDecorations,
  getSkillNameMap,
  getSkillActivationMap,
}
