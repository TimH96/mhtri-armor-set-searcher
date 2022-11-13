import SkillActivationMap from '../../data-provider/models/skills/SkillActivationMap'
import SkillActivation from '../../data-provider/models/skills/SkillActivation'
import { htmlToElement } from './html.helper'
import SkillNameMap from '../../data-provider/models/skills/SkillNameMap'

const getActivationElements = () => {
  return Array.from(document.getElementsByClassName('search-picker-activation'))
}

/** uncheck all selected skill activations */
const resetSkillActivations = () => {
  const activations = getActivationElements()

  activations.forEach((element) => {
    const checkbox = element.children[0] as HTMLInputElement
    const text = element.children[1] as HTMLElement

    checkbox.checked = false
    text.classList.remove('highlighted')
  })
}

/** get list of currently selected skill activations */
const getSkillActivations = (data: {
  skillName: SkillNameMap,
  skillActivation: SkillActivationMap,
}): SkillActivation[] => {
  const activations = getActivationElements()

  return activations
    // get only checked skills
    .filter((element) => {
      const checkbox = element.children[0] as HTMLInputElement
      return checkbox.checked
    })
    // map to proper data model
    .map((element) => {
      const name = element.textContent!.trim()
      const id = parseInt(element.getAttribute('data-id')!)
      const requiredSkill = parseInt(element.getAttribute('data-skill')!)
      const requiredPoints = parseInt(element.getAttribute('data-points')!)
      const category = parseInt(element.parentElement!.getAttribute('data-category')!)

      return {
        id,
        name,
        requiredPoints,
        requiredSkill,
        isPositive: requiredPoints > 0,
        category,
      }
    })
}

const renderCategories = (skillCategories: string[]) => {
  for (const index in skillCategories) {
    const categoryName = skillCategories[index]
    const node = htmlToElement(`
      <div class="search-picker-category" id="search-picker-category-${index}" data-category="${index}">
        <div class="search-picker-category-title banner">${categoryName}</div>
      </div>
    `)
    document.getElementById('search-skill-picker')!.appendChild(node)
  }
}

const renderActivations = (skillActivation: SkillActivationMap) => {
  skillActivation.forEach((activationList) => {
    activationList
      .filter(activation => activation.isPositive)
      .reverse()
      .forEach((activation) => {
        const node = htmlToElement(`
          <div class="search-picker-activation" data-skill="${activation.requiredSkill}" data-points="${activation.requiredPoints}" data-id="${activation.id}">
            <input style="float:left;" type="checkbox">
            <div class="search-picker-activation-name">${activation.name}</div>
          </div>
        `)
        document.getElementById(`search-picker-category-${activation.category}`)!.appendChild(node)
      })
  })
}

const attachClickListener = () => {
  const elements = Array.from(document.getElementsByClassName('search-picker-activation'))
  for (const item of elements) {
    item.addEventListener('click', (event) => {
      // tick checkbox
      const target = event.target as Element
      const input: HTMLInputElement = item.children[0] as HTMLInputElement
      if (target.tagName !== 'INPUT') {
        input.checked = !input.checked
      }

      // add highlight class
      const text = item.children[1]
      input.checked ? text.classList.add('highlighted') : text.classList.remove('highlighted')
    })
  }
}

/** render all components of skillpicker and attach handlers */
const renderSkillPicker = (
  skillActivation: SkillActivationMap,
  skillCategories: string[],
) => {
  renderCategories(skillCategories)
  renderActivations(skillActivation)
  attachClickListener()
}

export {
  renderSkillPicker,
  getSkillActivations,
  resetSkillActivations,
}
