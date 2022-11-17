import UserCharmList from '../../data-provider/models/equipment/UserCharmList'
import SearchConstraints from '../../searcher/models/SearchConstraints'
import StaticEquipmentData from '../../data-provider/models/equipment/StaticEquipmentData'
import StaticSkillData from '../../data-provider/models/skills/StaticSkillData'
import { search } from '../../searcher/searcher.module'
import { getGlobalSettings } from './global-settings.component'
import { getSkillActivations, resetSkillActivations } from './picker.component'
import { renderResults } from './search-results.component'
import SkillActivation from '../../data-provider/models/skills/SkillActivation'

const arrangeSearchData = (skillData: StaticSkillData) => {
  // build params
  const globalSettings = getGlobalSettings()
  const skillActivations = getSkillActivations(skillData)

  // return if no skill selected
  if (skillActivations.length === 0) {
    return
  }

  // sanitize activation input to only include highest version of each skill
  const sanitizedSkillActivations = skillActivations
    .filter((thisAct, i) => {
      return skillActivations.every((compareAct, j) => {
        if (i === j) return true
        if (thisAct.requiredSkill !== compareAct.requiredSkill) return true

        return thisAct.requiredPoints >= compareAct.requiredPoints
      })
    })

  // create search params
  const searchParams: SearchConstraints = {
    weaponSlots: globalSettings.weaponSlots,
    armorType: globalSettings.armorType,
    armorRarity: globalSettings.armorRarity,
    decoRarity: globalSettings.decoRarity,
    limit: Math.min(Math.max(globalSettings.limit, 1), 1000),
    skillActivations: sanitizedSkillActivations,
  }

  return searchParams
}

const searchLogic = (equData: StaticEquipmentData, skillData: StaticSkillData) => {
  const searchParams = arrangeSearchData(skillData)

  if (!searchParams) {
    alert('Please select at least one skill')
    return
  }

  // search for sets
  const result = search(
    // equData.armor.map(x => x.filter(y => y.name.startsWith("Helios") && y.name.endsWith("+"))),
    equData.armor,
    equData.decorations,
    UserCharmList.Instance.get(),
    searchParams,
    skillData,
  )

  // render results
  renderResults(result, skillData, searchParams)
}

const moreSkillsLogic = (equData: StaticEquipmentData, skillData: StaticSkillData) => {
  const searchParams = arrangeSearchData(skillData)

  if (!searchParams) {
    alert('Please select at least one skill')
    return
  }

  const charms = UserCharmList.Instance.get()

  const aquirableSkills: SkillActivation[] = []

  for (const actMap of skillData.skillActivation) {
    const sActs = actMap[1]

    const processedActs = sActs
      .filter(act => act.requiredPoints >= 0)
      .filter(act => !searchParams.skillActivations.map(x => x.id).includes(act.id))
      .filter(act => !searchParams.skillActivations.find(x => act.requiredSkill === x.requiredSkill && act.requiredPoints < x.requiredPoints))
      .sort((a, b) => b.requiredPoints - a.requiredPoints)

    for (const act of processedActs) {
      const newParams: SearchConstraints = {
        ...searchParams,
        limit: 1,
        skillActivations: searchParams.skillActivations.concat(act),
      }

      const r = search(
        equData.armor,
        equData.decorations,
        charms,
        newParams,
        skillData,
      )

      if (!r) break
      else aquirableSkills.push(act)
    }
  }
}

const resetLogic = () => {
  resetSkillActivations()
}

/** attach handlers for control buttons */
export const attachControlListeners = (equData: StaticEquipmentData, skillData: StaticSkillData) => {
  const searchBtn = document.getElementById('search-btn') as HTMLButtonElement
  const moreSkillsBtn = document.getElementById('more-btn') as HTMLButtonElement
  const resetBtn = document.getElementById('reset-btn') as HTMLButtonElement

  searchBtn.addEventListener('click', () => {
    searchLogic(equData, skillData)
  })
  moreSkillsBtn.addEventListener('click', () => {
    moreSkillsLogic(equData, skillData)
  })
  resetBtn.addEventListener('click', () => {
    resetLogic()
  })
}
