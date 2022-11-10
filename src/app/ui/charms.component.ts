import SkillActivationMap from '../../data-provider/models/skills/SkillActivationMap'
import SkillNameMap from '../../data-provider/models/skills/SkillNameMap'
import Charm from '../../data-provider/models/equipment/Charm'
import UserCharmList from '../../data-provider/models/equipment/UserCharmList'
import { htmlToElement } from './html.helper'
import Slots from '../../data-provider/models/equipment/Slots'
import EquipmentCategory from '../../data-provider/models/equipment/EquipmentCategory'
import GameID from '../../data-provider/models/GameId'

/*
  TODO this file is the only file so far where I'm regretting this straightforward functional
  component approach, probably needs some refactoring at some point, I think moving different
  parts (picker vs table vs export) into own files would fix it already
*/

const range = (start: number, end: number) => Array.from({ length: (end - start) }, (_, k) => k + start)

const validSkill = (skill: {id: GameID, points: number}) => {
  return skill.points !== 0 && skill.id !== -1
}

const removeTableElement = (index: number) => {
  const ele = document.getElementsByClassName(`charm-${index}`)[0]
  ele.remove()
}

const addTableElement = (charm: Charm, index: number, skillNames: SkillNameMap) => {
  const ele = htmlToElement(`<tr class="charm-${index}" data-index="${index}"></tr>`)

  // get real table elements
  for (const skill of Array.from(charm.skills.keys())) {
    ele.appendChild(htmlToElement(`<td>${skillNames.get(skill)}</td>`))
    ele.appendChild(htmlToElement(`<td>${charm.skills.get(skill)}</td>`))
  }

  // get placeholder table elements
  const amountOfSkills = Array.from(charm.skills.keys()).length
  // eslint-disable-next-line no-unused-vars
  for (const _ in range(amountOfSkills, 2)) {
    ele.appendChild(htmlToElement('<td></td>'))
    ele.appendChild(htmlToElement('<td></td>'))
  }

  // get slots and delete
  ele.appendChild(htmlToElement(`<td>${charm.slots}</td>`))
  const d = htmlToElement('<td class="charm-delete">X</td>')
  d.addEventListener('click', () => removeCharm(index))
  ele.appendChild(d)

  // add final element
  const tbody = document.getElementById('charm-table')!.children[0]
  tbody.appendChild(ele)
}

const addCharm = (charm: Charm, skillNames: SkillNameMap) => {
  const i = UserCharmList.Instance.add(charm)
  addTableElement(charm, i - 1, skillNames)
}

const removeCharm = (index: number) => {
  UserCharmList.Instance.remove(index)
  removeTableElement(index)
}

const onAddClick = (skillNames: SkillNameMap) => {
  // parse data
  const slots = parseInt((document.getElementById('charm-slots') as HTMLSelectElement).value)
  const skills = [1, 2].map((x) => {
    return {
      id: parseInt((document.getElementById(`charm-skill-${x}-name`) as HTMLSelectElement).value),
      points: parseInt((document.getElementById(`charm-skill-${x}-points`) as HTMLSelectElement).value),
    }
  })

  // return if charm invalid
  if (slots === 0 && !skills.some(validSkill)) {
    return
  }

  // map to model
  const charm: Charm = {
    name: 'charm',
    slots: slots as Slots,
    category: EquipmentCategory.CHARM,
    skills: new Map(skills
      .filter(validSkill)
      .map((skill) => {
        return [skill.id, skill.points]
      })),
  }

  // add
  addCharm(charm, skillNames)
}

const attachControlListeners = (skillNames: SkillNameMap) => {
  document.getElementById('charm-add')!.addEventListener('click', () => onAddClick(skillNames))
}

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
  attachControlListeners(skillNames)
}
