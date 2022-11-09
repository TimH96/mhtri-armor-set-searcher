import DataInput from '../../searcher/models/DataInput'
import SearchConstraints from '../../searcher/models/SearchConstraints'
import { search } from '../../searcher/searcher.module'
import { getGlobalSettings } from './global-settings.component'
import { getSkillActivations, resetSkillActivations } from './picker.component'

const searchLogic = (data: DataInput) => {
  const globalSettings = getGlobalSettings()

  const searchParams: SearchConstraints = {
    weaponSlots: globalSettings.weaponSlots,
    skillActivations: getSkillActivations(data),
  }

  const result = search(data, searchParams)

  // TODO build list
  console.log(result)
}

const resetLogic = () => {
  resetSkillActivations()

  // TODO reset list
}

export const attachControlListeners = (data: DataInput) => {
  const searchBtn = document.getElementById('search-btn') as HTMLButtonElement
  const resetBtn = document.getElementById('reset-btn') as HTMLButtonElement

  searchBtn.addEventListener('click', () => {
    searchLogic(data)
  })
  resetBtn.addEventListener('click', () => {
    resetLogic()
  })
}
