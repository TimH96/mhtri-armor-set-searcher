import { getArms, getChest, getDecorations, getHead, getLegs, getSkillActivationMap, getSkillCategories, getSkillNameMap, getWaist } from '../../data-provider/data-provider.module'
import StaticSkillData from '../../data-provider/models/skills/StaticSkillData'
import { renderCharmPicker } from '../ui/charms.component'
import { renderEqSettings } from '../ui/eq-settings.component'
import { initiateNavbar } from '../ui/navbar.component'
import { renderSkillPicker } from '../ui/picker.component'
import { attachControlListeners } from '../ui/search-controls.component'

const main = async () => {
  // initiate static components
  initiateNavbar()

  // load remaining data
  const armor = [
    await getHead(),
    await getChest(),
    await getArms(),
    await getWaist(),
    await getLegs(),
  ]
  const decorations = await getDecorations()

  // load skill data and render skill picker and charms with it
  const skillData: StaticSkillData = {
    skillName: await getSkillNameMap(),
    skillActivation: await getSkillActivationMap(),
    skillCategories: await getSkillCategories(),
  }

  // render ui
  renderSkillPicker(skillData.skillActivation, skillData.skillCategories)
  renderCharmPicker(skillData.skillName, skillData.skillActivation, skillData.skillCategories)
  renderEqSettings(armor)

  // initialize search controls
  attachControlListeners({ armor, decorations }, skillData)
}

main()
