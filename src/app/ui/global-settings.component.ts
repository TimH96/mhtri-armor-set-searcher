import Slots from '../../data-provider/models/equipment/Slots'
import GlobalSettings from '../models/GlobalSettings'

export const getGlobalSettings = (): GlobalSettings => {
  const armorSelect = document.getElementById('armor-type') as HTMLSelectElement
  const weaponSlots = document.getElementById('weapon-slots') as HTMLSelectElement

  return {
    armorType: armorSelect.selectedIndex + 1,
    weaponSlots: weaponSlots.selectedIndex as Slots,
  }
}
