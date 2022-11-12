/* eslint-disable no-undef */
import ArmorPiece from './models/equipment/ArmorPiece'
import Decoration from './models/equipment/Decoration'
import EquipmentSkillsMin from './models/equipment/EquipmentSkillsMin'
import GameID from './models/GameId'
import SkillActivation from './models/skills/SkillActivation'
import SkillActivationMap from './models/skills/SkillActivationMap'
import SkillMin from './models/skills/SkillMin'
import SkillNameMap from './models/skills/SkillNameMap'

const MAX_RARITY = 7

const TORSO_UP_ID = 83

/** fetch from data directory */
const getRawData = async (url: string) => {
  return (await fetch(url)).json()
}

/** fetch and parse generic equipment data */
const getDataWithTransformedSkillMap = async (url: string): Promise<{skills: EquipmentSkillsMin}[]> => {
  const raw = await getRawData(url)
  return raw.map((rawX: any) => {
    const skillMap: EquipmentSkillsMin = new Map()
    for (const x in rawX.skills) {
      const skill: SkillMin = { points: rawX.skills[x] }
      skillMap.set(parseInt(x), skill)
    }
    return {
      ...rawX,
      skills: skillMap,
    }
  })
}

/** get a list of all head armor pieces */
const getHead = async (): Promise<ArmorPiece[]> => {
  return getDataWithTransformedSkillMap('./head.json') as unknown as ArmorPiece[]
}

/** get a list of all chest armor pieces */
const getChest = async (): Promise<ArmorPiece[]> => {
  return getDataWithTransformedSkillMap('./chest.json') as unknown as ArmorPiece[]
}

/** get a list of all arms armor pieces */
const getArms = async (): Promise<ArmorPiece[]> => {
  return getDataWithTransformedSkillMap('./arms.json') as unknown as ArmorPiece[]
}

/** get a list of all waist armor pieces */
const getWaist = async (): Promise<ArmorPiece[]> => {
  return getDataWithTransformedSkillMap('./waist.json') as unknown as ArmorPiece[]
}

/** get a list of all legs armor pieces */
const getLegs = async (): Promise<ArmorPiece[]> => {
  return getDataWithTransformedSkillMap('./legs.json') as unknown as ArmorPiece[]
}

/** get a list of all decorations */
const getDecorations = async (): Promise<Decoration[]> => {
  return getDataWithTransformedSkillMap('./decorations.json') as unknown as Decoration[]
}

/** get a mapping of internal id to name for all skills */
const getSkillNameMap = async (): Promise<SkillNameMap> => {
  const raw = await getRawData('./skill-names.json')
  const map: Map<GameID, string> = new Map()
  for (const id in raw) {
    map.set(parseInt(id), raw[id])
  }
  return map
}

/** get a list of skill category names, as used in the UI */
const getSkillCategories = async (): Promise<string[]> => {
  return getRawData('./skill-categories.json')
}

/** get a mapping of internal id of skill to all activations (positive and negative) of that skill */
const getSkillActivationMap = async (): Promise<SkillActivationMap> => {
  const raw = await getRawData('./skills.json')
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
  MAX_RARITY,
  TORSO_UP_ID,
  getHead,
  getChest,
  getArms,
  getWaist,
  getLegs,
  getDecorations,
  getSkillNameMap,
  getSkillCategories,
  getSkillActivationMap,
}
