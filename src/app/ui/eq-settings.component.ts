import EquipmentCategory from '../../data-provider/models/equipment/EquipmentCategory'
import UserEquipmentSettings from '../../data-provider/models/user/UserEquipmentSettings'
import { htmlToElement } from '../../helper/html.helper'
import EquipmentMin from '../../data-provider/models/equipment/EquipmentMin'

const saveToStorage = () => {
  window.localStorage.setItem(
    'eq-settings',
    UserEquipmentSettings.Instance.serialize(),
  )
}

const getFromStorage = () => {
  return window.localStorage.getItem('eq-settings')
}

const getExclusionElement = (x: EquipmentMin) => {
  const root = document.createElement('div')
  root.style.textAlign = 'left'
  root.setAttribute("data-name", x.name)
  root.classList.add("eq-exclusion-ele")

  const content = htmlToElement(`<span>${x.name}</span>`)
  const remove = htmlToElement('<span>X</span>') as HTMLSpanElement
  remove.addEventListener('click', () => removeExlusion(x))
  remove.style.marginRight = '1em'
  remove.style.marginLeft = '1em'
  remove.style.cursor = "pointer"

  root.appendChild(remove)
  root.appendChild(content)
  return root
}

const getPinPicker = (cat: EquipmentCategory, eq: EquipmentMin[]) => {
  const root = document.createElement('div')
  root.style.textAlign = 'left'

  const content = document.createElement('select')
  content.setAttribute('id', `eq-${cat}-pin-picker`)
  content.style.width = '72%'
  for (const x of [{ name: 'None', category: cat }].concat(...eq)) {
    content.appendChild(
      htmlToElement(`<option value="${x.name}">${x.name}</option>`),
    )
  }
  content.addEventListener('change', () => {
    addPin({ name: content.value, category: cat })
  })
  const remove = htmlToElement('<span>X</span>') as HTMLSpanElement
  remove.addEventListener('click', () => removePin(eq[0].category))
  remove.style.marginRight = '1em'
  remove.style.marginLeft = '1em'
  remove.style.cursor = "pointer"

  root.appendChild(remove)
  root.appendChild(content)
  return root
}

const renderColumns = (armor: EquipmentMin[][]) => {
  const parent = document.getElementById('eq-container')
  for (const item of [
    [EquipmentCategory.HEAD, 'Head', armor[0]],
    [EquipmentCategory.CHEST, 'Chest', armor[1]],
    [EquipmentCategory.ARMS, 'Arms', armor[2]],
    [EquipmentCategory.WAIST, 'Waist', armor[3]],
    [EquipmentCategory.LEGS, 'Legs', armor[4]],
  ]) {
    const cat = item[0] as EquipmentCategory
    const name = item[1] as string
    const eq = item[2] as EquipmentMin[]

    const root = htmlToElement(`<div class="eq-column" data-eq-column-type="${cat}"></div>`,)

    // pins
    const pinHeader = htmlToElement(`<div class="eq-column-item eq-column-header">${name} Pinned</div>`,)
    const pinContent = htmlToElement('<div class="eq-column-item eq-column-content eq-column-pin"></div>',)
    const pinElement = getPinPicker(cat, eq)
    pinContent.appendChild(pinElement)

    // exclusions
    const exclusionHeader = htmlToElement(`<div class="eq-column-item eq-column-header">${name} Excluded</div>`,)
    const exclusionContent = htmlToElement(`<div id="eq-${cat}-exclusion" class="eq-column-item eq-column-content eq-column-exclusion"></div>`,)

    root.appendChild(pinHeader)
    root.appendChild(pinContent)
    root.appendChild(exclusionHeader)
    root.appendChild(exclusionContent)
    parent!.appendChild(root)
  }
}

const _addExclusion = (x: EquipmentMin) => {
  const parent = document.getElementById(`eq-${x.category}-exclusion`)
  parent!.appendChild(getExclusionElement(x))
}

export const removeExlusion = (x: EquipmentMin) => {
  const ele = Array.from(document.getElementsByClassName("eq-exclusion-ele")).find((a) => {
    const b = a as HTMLElement
    return b.getAttribute("data-name") === x.name
  }) as HTMLElement
  if (!ele) return

  ele.remove()
  UserEquipmentSettings.Instance.removeExclusion(x)
  saveToStorage()
}

export const removePin = (cat: EquipmentCategory) => {
  const ele = document.getElementById(`eq-${cat}-pin-picker`) as HTMLSelectElement
  UserEquipmentSettings.Instance.removePin(cat)
  ele.selectedIndex = 0
  saveToStorage()
}

export const addExclusion = (x: EquipmentMin) => {
  if (UserEquipmentSettings.Instance.hasExclusion(x)) return
  UserEquipmentSettings.Instance.addExclusion(x)
  _addExclusion(x)
}

export const addPin = (x: EquipmentMin) => {
  if (x.name === 'None') {
    UserEquipmentSettings.Instance.removePin(x.category)
    return
  }

  UserEquipmentSettings.Instance.addPin(x)
  saveToStorage()
  const select = document.getElementById(
    `eq-${x.category}-pin-picker`,
  ) as HTMLSelectElement
  select.value = x.name
}

export const renderEqSettings = (armor: EquipmentMin[][]) => {
  renderColumns(armor)

  const raw = getFromStorage()
  if (raw) UserEquipmentSettings.Instance.deserialize(raw)

  for (const exclusionList of UserEquipmentSettings.Instance.exclusions) {
    for (const x of exclusionList) {
      _addExclusion(x)
    }
  }
  UserEquipmentSettings.Instance.pins.forEach((x, i) => {
    if (x) addPin(x)
    else removePin(i)
  })
}
