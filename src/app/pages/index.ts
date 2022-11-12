import { getArms, getChest, getDecorations, getHead, getLegs, getSkillActivationMap, getSkillCategories, getSkillNameMap, getWaist } from '../../data-provider/data-provider.module'
import StaticSkillData from '../../searcher/models/StaticSkillData'
import { renderCharmPicker } from '../ui/charms.component'
import { initiateNavbar } from '../ui/navbar.component'
import { renderSkillPicker } from '../ui/picker.component'
import { attachControlListeners } from '../ui/search-controls.component'

const main = async () => {
  // initiate static components
  initiateNavbar()

  // load skill data and render skill picker and charms with it
  const skillData: StaticSkillData = {
    skillName: await getSkillNameMap(),
    skillActivation: await getSkillActivationMap(),
    skillCategories: await getSkillCategories(),
  }
  renderSkillPicker(skillData.skillActivation, skillData.skillCategories)
  renderCharmPicker(skillData.skillName, skillData.skillActivation, skillData.skillCategories)

  // load remaining data
  const armor = [
    await getHead(),
    await getChest(),
    await getArms(),
    await getWaist(),
    await getLegs(),
  ]
  const decorations = await getDecorations()

  // initialize search controls
  attachControlListeners({ armor, decorations }, skillData)

  // TODO debug remove
  document.getElementById('search-btn')!.click()
}

main()
