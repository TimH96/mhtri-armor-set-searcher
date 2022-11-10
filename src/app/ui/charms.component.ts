import SkillActivationMap from '../../data-provider/models/skills/SkillActivationMap'
import SkillNameMap from '../../data-provider/models/skills/SkillNameMap'
import { htmlToElement } from './html.helper'

const range = (start: number, end: number) => Array.from({ length: (end - start) }, (v, k) => k + start)

const populatePointsPickers = () => {
  const pickers = document.getElementsByClassName('charm-points-pick')
  for (const picker of Array.from(pickers)) {
    for (const amount of range(-10, 11).reverse()) {
      picker.appendChild(htmlToElement(`
        <option ${amount === 0 ? 'selected="selected"' : ''} value="${amount}">${amount}</option>
      `))
    }
  }
}

const populateSkillsPickers = (
  skillNames: SkillNameMap,
  skillActivation: SkillActivationMap,
  skillCategories: string[],
) => {
  const pickers = document.getElementsByClassName('charm-skill-pick')
  for (const picker of Array.from(pickers)) {
    // make optgroup for each category
    const optGroups = skillCategories.map((category, i) => {
      return htmlToElement(`
        <optgroup label="${category}" data-category="${i}"></optgroup>
      `)
    })

    // append skill options to optgroup
    skillActivation.forEach((activationList) => {
      const dummyActivation = activationList[0]
      const category = dummyActivation.category
      const skill = dummyActivation.requiredSkill
      const name = skillNames.get(skill)

      const ele = htmlToElement(`
        <option value="${skill}" data-skill="${skill}">${name}</option>
      `)
      optGroups[category].appendChild(ele)
    })

    // add default
    optGroups.unshift(htmlToElement(`
      <option value="-1" data-skill="-1">None</option>
    `))

    // add elements and select default
    picker.append(...optGroups)
    picker.getElementsByTagName('option')[0].selected = true
  }
}

const populateCharmPicker = (
  skillNames: SkillNameMap,
  skillActivation: SkillActivationMap,
  skillCategories: string[],
) => {
  populatePointsPickers()
  populateSkillsPickers(skillNames, skillActivation, skillCategories)
}

export const renderCharmPicker = (
  skillNames: SkillNameMap,
  skillActivation: SkillActivationMap,
  skillCategories: string[],
) => {
  populateCharmPicker(skillNames, skillActivation, skillCategories)
}
