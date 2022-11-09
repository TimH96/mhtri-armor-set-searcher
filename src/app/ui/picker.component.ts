import SkillActivationMap from '../../data-provider/models/skills/SkillActivationMap'
import { htmlToElement } from './html.helper'

const renderCategories = (skillCategories: string[]) => {
  for (const index in skillCategories) {
    const categoryName = skillCategories[index]
    const node = htmlToElement(`
      <div class="search-picker-category" id="search-picker-category-${index}" data-category="${index}">
        <div class="search-picker-category-title">${categoryName}</div>
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
      .forEach((activattion) => {
        const node = htmlToElement(`
          <div class="search-picker-activation" data-skill="${activattion.requiredSkill}" data-points="${activattion.requiredPoints}">
            <input style="float:left;" type="checkbox">
            <div class="search-picker-activation-name">${activattion.name}</div>
          </div>
        `)
        document.getElementById(`search-picker-category-${activattion.category}`)!.appendChild(node)
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

const renderSkillPicker = async (
  skillActivation: SkillActivationMap,
  skillCategories: string[],
) => {
  renderCategories(skillCategories)
  renderActivations(skillActivation)
  attachClickListener()
}

export { renderSkillPicker }
