import UserCharmList from '../../data-provider/models/equipment/UserCharmList'
import SearchConstraints from '../../searcher/models/SearchConstraints'
import StaticEquipmentData from '../../searcher/models/StaticEquipmentData'
import StaticSkillData from '../../searcher/models/StaticSkillData'
import { search } from '../../searcher/searcher.module'
import { getGlobalSettings } from './global-settings.component'
import { getSkillActivations, resetSkillActivations } from './picker.component'
import { renderResults } from './search-results.component'

const searchLogic = (equData: StaticEquipmentData, skillData: StaticSkillData) => {
  // build params
  const globalSettings = getGlobalSettings()
  const skillActivations = getSkillActivations(skillData)

  // return if no skill selected
  if (skillActivations.length === 0) {
    alert('Please select at least one skill')
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
    skillActivations: sanitizedSkillActivations,
    limit: 50,
  }

  // search for sets
  const result = search(equData.armor, equData.decorations, UserCharmList.Instance.get(), searchParams)

  // render results
  renderResults(result, skillData, searchParams)
}

const resetLogic = () => {
  resetSkillActivations()
}

/** attach handlers for control buttons */
export const attachControlListeners = (equData: StaticEquipmentData, skillData: StaticSkillData) => {
  const searchBtn = document.getElementById('search-btn') as HTMLButtonElement
  const resetBtn = document.getElementById('reset-btn') as HTMLButtonElement

  searchBtn.addEventListener('click', () => {
    searchLogic(equData, skillData)
  })
  resetBtn.addEventListener('click', () => {
    resetLogic()
  })
}
