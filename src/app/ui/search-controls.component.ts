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
  const searchParams: SearchConstraints = {
    weaponSlots: globalSettings.weaponSlots,
    armorType: globalSettings.armorType,
    armorRarity: globalSettings.armorRarity,
    decoRarity: globalSettings.decoRarity,
    skillActivations: getSkillActivations(skillData),
    limit: 50,
  }

  // return if no skill selected
  if (searchParams.skillActivations.length === 0) {
    alert('Please select at least one skill')
    return
  }

  // search for sets
  const result = search(equData.armor, equData.decorations, UserCharmList.Instance.get(), searchParams, skillData)

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
