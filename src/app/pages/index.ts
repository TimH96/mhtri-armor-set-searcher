import { getArms, getChest, getDecorations, getHead, getLegs, getSkillActivationMap, getSkillCategories, getSkillNameMap, getWaist } from '../../data-provider/data-provider.module'
import DataInput from '../../searcher/models/DataInput'
import { search } from '../../searcher/searcher.module'
import { renderSkillPicker } from '../ui/picker.component'

const main = async () => {
  const skillData = {
    skillName: await getSkillNameMap(),
    skillActivation: await getSkillActivationMap(),
    skillCategories: await getSkillCategories(),
  }

  await renderSkillPicker(skillData.skillName, skillData.skillActivation, skillData.skillCategories)

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

  search(
    data,
    {
      weaponSlots: 0,
      skillActivations: [],
    },
  )

  /// ///////////////////////////////////////
}

main()
