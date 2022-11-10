import { getArms, getChest, getDecorations, getHead, getLegs, getSkillActivationMap, getSkillCategories, getSkillNameMap, getWaist } from '../../data-provider/data-provider.module'
import DataInput from '../../searcher/models/DataInput'
import { renderCharmPicker } from '../ui/charms.component'
import { initiateNavbar } from '../ui/navbar.component'
import { renderSkillPicker } from '../ui/picker.component'
import { attachControlListeners } from '../ui/search-controls.component'

const main = async () => {
  // initiate static components
  initiateNavbar()

  // load skill data and render skill picker and charms with it
  const skillData = {
    skillName: await getSkillNameMap(),
    skillActivation: await getSkillActivationMap(),
    skillCategories: await getSkillCategories(),
  }
  renderSkillPicker(skillData.skillActivation, skillData.skillCategories)
  renderCharmPicker(skillData.skillName, skillData.skillActivation, skillData.skillCategories)

  // load remaining data
  const staticEquipmentData = {
    head: await getHead(),
    chest: await getChest(),
    arms: await getArms(),
    waist: await getWaist(),
    legs: await getLegs(),
    decorations: await getDecorations(),
  }
  const data: DataInput = {
    ...skillData,
    ...staticEquipmentData,
    charms: [],
  }

  // initialize search controls
  attachControlListeners(data)
}

main()
