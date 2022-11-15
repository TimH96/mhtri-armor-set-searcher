import Rarity from '../../data-provider/models/equipment/Rarity'
import Slots from '../../data-provider/models/equipment/Slots'
import GlobalSettings from '../models/GlobalSettings'

export const getGlobalSettings = (): GlobalSettings => {
  const armorSelect = document.getElementById('armor-type') as HTMLSelectElement
  const weaponSlots = document.getElementById('weapon-slots') as HTMLSelectElement
  const armorRarity = document.getElementById('armor-rarity') as HTMLSelectElement
  const decoRarity = document.getElementById('deco-rarity') as HTMLSelectElement
  const limit = document.getElementById('search-limit') as HTMLInputElement

  return {
    armorType: parseInt(armorSelect.value),
    weaponSlots: parseInt(weaponSlots.value) as Slots,
    armorRarity: parseInt(armorRarity.value) as Rarity,
    decoRarity: parseInt(decoRarity.value) as Rarity,
    limit: parseInt(limit.value),
  }
}
