import { getArms, getChest, getDecorations, getHead, getLegs, getSkillActivationMap, getSkillCategories, getSkillNameMap, getWaist } from '../../data-provider/data-provider.module'
import DataInput from '../../searcher/models/DataInput'
import { search } from '../../searcher/searcher.module'

const htmlToElement = (html: string): Node => {
  const template = document.createElement('template')
  html = html.trim()
  template.innerHTML = html
  return template.content.firstChild as Node
}

async function main () {
  const skillCategories = await getSkillCategories()

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

  //////////////////////////////////////////

  for (const index in skillCategories) {
    const category = skillCategories[index]
    const node = htmlToElement(`
      <div class="search-picker-category" id="search-picker-category-${index}" data-category="${index}">
        ${category}
      </div>
    `)
    console.log(category)
    document.getElementById("search-skill-picker")!.appendChild(node)
  }

  data.skillActivation.forEach((activationList) => {
    activationList
      .filter(activation => activation.isPositive)
      .reverse()
      .forEach((activattion) => {
        const node = htmlToElement(`
          <div class="search-picker-activation" data-skill="${activattion.requiredSkill}" data-points="${activattion.requiredPoints}">
            ${activattion.name}
          </div>
        `)
        document.getElementById(`search-picker-category-${activattion.category}`)!.appendChild(node)
      })
  })
}

main()
