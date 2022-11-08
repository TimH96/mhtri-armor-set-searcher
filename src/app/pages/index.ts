import { getArms, getChest, getDecorations, getHead, getLegs, getSkillActivationMap, getSkillNameMap, getWaist } from '../../data-provider/data-provider.module'
import DataInput from '../../searcher/models/DataInput'
import { search } from '../../searcher/searcher.module'

async function main () {
  const data: DataInput = {
    head: await getHead(),
    chest: await getChest(),
    arms: await getArms(),
    waist: await getWaist(),
    legs: await getLegs(),
    decorations: await getDecorations(),
    charms: [],
    skillName: await getSkillNameMap(),
    skillActivation: await getSkillActivationMap(),
  }

  search(
    data,
    {
      weaponSlots: 0,
      skillActivations: [],
    },
  )
}

main()
