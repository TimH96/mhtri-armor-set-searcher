import UserCharmList from '../../data-provider/models/equipment/UserCharmList'
import SearchConstraints from '../../searcher/models/SearchConstraints'
import StaticEquipmentData from '../../searcher/models/StaticEquipmentData'
import StaticSkillData from '../../searcher/models/StaticSkillData'
import { search } from '../../searcher/searcher.module'
import { getGlobalSettings } from './global-settings.component'
import { getSkillActivations, resetSkillActivations } from './picker.component'

const searchLogic = (equData: StaticEquipmentData, skillData: StaticSkillData) => {
  const globalSettings = getGlobalSettings()

  const searchParams: SearchConstraints = {
    weaponSlots: globalSettings.weaponSlots,
    armorType: globalSettings.armorType,
    armorRarity: globalSettings.armorRarity,
    decoRarity: globalSettings.decoRarity,
    skillActivations: getSkillActivations(skillData),
    limit: 200,
  }

  const result = search(equData.armor, equData.decorations, UserCharmList.Instance.get(), searchParams)

  // TODO build list
  console.log(result)
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
