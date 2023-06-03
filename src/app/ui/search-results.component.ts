import ArmorSet from '../../searcher/models/ArmorSet'
import SearchConstraints from '../../searcher/models/SearchConstraints'
import StaticSkillData from '../../data-provider/models/skills/StaticSkillData'
import UserEquipmentSettings from '../../data-provider/models/user/UserEquipmentSettings'
import { htmlToElement } from '../../helper/html.helper'
import SkillActivation from '../../data-provider/models/skills/SkillActivation'
import SkillActivationMap from '../../data-provider/models/skills/SkillActivationMap'
import { addExclusion, addPin, removeExlusion, removePin } from './eq-settings.component'

export function * moreSkillsIterator (skillActivations: SkillActivationMap) {
  const rContainer = clearAndGetResultsContainer()
  const countDiv = document.createElement('div')
  rContainer.appendChild(countDiv)

  const totalActCount = Array.from(skillActivations.values())
    .reduce((sum, c) => sum + c.length, 0)

  for (let i = 0; i < totalActCount; i++) {
    countDiv.innerHTML = `Checked ${i} possible skills ...`
    yield i
  }
}

const onSetClick = (tbNode: Node, viewGetter: () => Node) => {
  const children = tbNode.childNodes
  const finalNode = children[children.length - 1] as HTMLTableRowElement

  // toggle if details have already been rendered
  if (finalNode.classList.contains('result-set-details')) {
    finalNode.classList.toggle('hidden')
    return
  }

  // render and append them otherwise
  tbNode.appendChild(viewGetter())
}

const PINS_OR_EXCL_ACTIVE_BANNER = htmlToElement(`
  <div class="results-banner banner">
    You have some pins or exclusions active, which may be limiting results. You may find some results by removing those pins or exclusions.
  <div>
`)

const getExpandedView = (set: ArmorSet, skillData: StaticSkillData, searchParams: SearchConstraints) => {
  // build header
  const header = htmlToElement(`
    <tr>
      <th>Skill</th>
      <th style="width: 6%">Weapon</th>
      <th style="width: 6%">Head</th>
      <th style="width: 6%">Chest</th>
      <th style="width: 6%">Arms</th>
      <th style="width: 6%">Waist</th>
      <th style="width: 6%">Legs</th>
      <th style="width: 6%">Charm</th>
      <th style="width: 6%">Deco</th>
      <th style="width: 6%">Total</th>
      <th>Active</th>
    </tr>
  `)

  // build skills rows
  const skillRows = Array.from(set.evaluation!.skills.entries())
    .sort(([_a, a], [_b, b]) => b - a)
    .map(([sId, sVal]) => {
      const r = document.createElement('tr')

      const computedDecoValue = set.decos
        .map(d => d.skills.get(sId)!)
        .reduce((sum, c) => sum + c, 0)

      r.appendChild(htmlToElement(`<td>${skillData.skillName.get(sId) ? skillData.skillName.get(sId)! : ''}</td>`))
      r.appendChild(htmlToElement('<td></td>')) // weapon
      for (const p of set.getPieces()) {
        r.append(htmlToElement(`<td>${p.skills.get(sId) ? p.skills.get(sId)! : ''}</td>`))
      }
      r.append(htmlToElement(`<td>${set.charm.skills.get(sId) ? set.charm.skills.get(sId)! : ''}</td>`))
      r.append(htmlToElement(`<td>${computedDecoValue || ''}</td>`))
      r.append(htmlToElement(`<td>${sVal}</td>`))
      const possibleAct = set.evaluation!.activations.find(a => a.requiredSkill === sId)
      if (possibleAct) r.append(htmlToElement(`<td ${!possibleAct.isPositive ? 'class="neg-skill"' : ''}}">${possibleAct.name}</td>`))
      return r
    })

  // build slot list
  const slotRow = document.createElement('tr')
  slotRow.appendChild(htmlToElement('<td>Slots</td>'))
  const rawSlowList = [searchParams.weaponSlots, ...set.getPieces().map(x => x.slots), set.charm.slots]
  rawSlowList.forEach(s => slotRow.appendChild(htmlToElement(`<td>${s}</td>`)))

  // append elements to table
  const skillTable = htmlToElement('<table class="result-set-skill-table"></table>')
  skillTable.appendChild(header)
  skillRows.forEach(x => skillTable.appendChild(x))
  skillTable.appendChild(slotRow)

  // build deco list
  const decoNameMap: Map<string, number> = new Map()
  for (const deco of set.decos) {
    const name = deco.name
    decoNameMap.set(name, 1 + (decoNameMap.get(name) || 0))
  }
  const decoNameList = Array.from(decoNameMap.entries())
    .map(([name, amount]) => `${amount} x ${name}`)
  const decoNameString = decoNameList.join(', ')
  const decoNameContainer = htmlToElement(`
    <div><span>${decoNameString}</span></div>
  `)

  // build piece table
  const pieceTable = htmlToElement('<table class="result-set-piece-table"></table>')
  const pieceTableHeader = htmlToElement('<tr><th>Def</th><th>Piece</th><th>Pin</th><th>Excl</th></tr>')
  pieceTable.appendChild(pieceTableHeader)
  for (const piece of set.getPieces()) {
    const pieceTableEle = document.createElement('tr')
    const pieceTableDef = htmlToElement(`<td style="width: 20%;">${piece.defense.max}</td>`)
    const pieceTableName = htmlToElement(`<td style="width: 50%;">${piece.name}</td>`)

    const pieceTablePin = (piece.isGeneric
      ? htmlToElement('<td style="user-select: none; width: 15%;"></td>')
      : htmlToElement('<td style="user-select: none; width: 15%; cursor: pointer;">✓</td>')) as HTMLElement
    const pieceTableExcl = htmlToElement('<td style="user-select: none; width: 15%; cursor: pointer;">X</td>') as HTMLElement
    if (UserEquipmentSettings.Instance.hasPin(piece)) pieceTablePin.classList.add('pin-highlighted')
    if (UserEquipmentSettings.Instance.hasExclusion(piece)) pieceTableExcl.classList.add('excl-highlighted')

    pieceTablePin.addEventListener('click', () => {
      if (piece.isGeneric) return

      if (UserEquipmentSettings.Instance.hasPin(piece)) {
        removePin(piece.category)
        pieceTablePin.classList.remove('pin-highlighted')
      } else {
        addPin(piece)
        pieceTablePin.classList.add('pin-highlighted')
      }
    })
    pieceTableExcl.addEventListener('click', () => {
      if (UserEquipmentSettings.Instance.hasExclusion(piece)) {
        removeExlusion(piece)
        pieceTableExcl.classList.remove('excl-highlighted')
      } else {
        addExclusion(piece)
        pieceTableExcl.classList.add('excl-highlighted')
      }
    })

    pieceTableEle.appendChild(pieceTableDef)
    pieceTableEle.appendChild(pieceTableName)
    pieceTableEle.appendChild(pieceTablePin)
    pieceTableEle.appendChild(pieceTableExcl)
    pieceTable.appendChild(pieceTableEle)
  }

  // return final div
  const tr = htmlToElement('<tr class="result-set-details"></tr>')
  const td = htmlToElement('<td colspan="6""></td>')
  const d = htmlToElement('<div class="result-set-details-container"></div>')
  td.appendChild(d)
  tr.appendChild(td)
  d.appendChild(pieceTable)
  d.appendChild(skillTable)
  d.appendChild(document.createElement('div')) // dummy for easy grid
  d.appendChild(decoNameContainer)
  return tr
}

const getSetElement = (set: ArmorSet, skillData: StaticSkillData, searchParams: SearchConstraints) => {
  // get bonus and negative skills
  const requiredActivations = searchParams.skillActivations
  const unrelatedActivations = set.evaluation!.activations.filter((act) => {
    return !act.isPositive || // negative skill
      !requiredActivations.find(req => req.requiredSkill === act.requiredSkill) || // skill is not in required
      requiredActivations.find(req => req.requiredSkill === act.requiredSkill && act.requiredPoints > req.requiredPoints) // skill is upgrade of smth required
  })
  const unrelatedHtmlStrings = unrelatedActivations
    .sort((a, b) => b.requiredPoints - a.requiredPoints)
    .map((x) => {
      return `<span class="result-set-unrelated-skill ${!x.isPositive ? 'neg-skill' : ''}">${x.name}</span>`
    })

  // get basic display components
  const tb = htmlToElement('<tbody class="result-set"></tbody>')
  const row1 = htmlToElement(`
    <tr class="result-set-row result-set-row1">
      <td>${set.head.name}</td>
      <td>${set.chest.name}</td>
      <td>${set.arms.name}</td>
      <td>${set.waist.name}</td>
      <td>${set.legs.name}</td>
      <td>${set.charm.name}</td>
    </tr>`)
  const row2 = htmlToElement(`
    <tr class="result-set-row result-set-row2">
      <td colspan="6">
        <p><span class="def">DEF</span> <span>${set.evaluation.defense.max}</span></p>
        <p><span class="fir">FIR</span> <span>${set.evaluation.resistance[0]}</span></p>
        <p><span class="wat">WAT</span> <span>${set.evaluation.resistance[1]}</span></p>
        <p><span class="ice">ICE</span> <span>${set.evaluation.resistance[2]}</span></p>
        <p><span class="thn">THN</span> <span>${set.evaluation.resistance[3]}</span></p>
        <p><span class="drg">DRG</span> <span>${set.evaluation.resistance[4]}</span></p>
        <span class="result-set-unrelated">${unrelatedHtmlStrings.join('')}</span>
      </td>
    </tr>`)

  // append basic display components
  const getter = () => { return getExpandedView(set, skillData, searchParams) }
  for (const row of [row1, row2]) {
    tb.appendChild(row)
    row.addEventListener('click', () => onSetClick(tb, getter))
  }

  return tb
}

const onMoreSkillsActClick = (d: HTMLDivElement) => {
  const id = parseInt(d.getAttribute('data-id')!)

  for (const ele of Array.from(document.getElementsByClassName('search-picker-activation'))) {
    const thisId = parseInt(ele.getAttribute('data-id')!)
    if (id === thisId) {
      (ele as HTMLDivElement).click()
      break
    }
  }
}

const clearAndGetResultsContainer = () => {
  const resultContainer = document.getElementById('search-results')!
  for (const c of Array.from(resultContainer.children)) c.remove()
  return resultContainer
}

export const renderMoreSkills = (activations: SkillActivation[], pinsOrExclActive: boolean) => {
  const resultContainer = clearAndGetResultsContainer()

  if (activations.length === 0) {
    resultContainer.appendChild(htmlToElement(`
      <div class="results-banner banner">
        Can't fit more skills
      <div>
    `))

    if (pinsOrExclActive) resultContainer.appendChild(PINS_OR_EXCL_ACTIVE_BANNER)

    return
  }

  for (const act of activations) {
    const d = htmlToElement(`<div class="results-more-skills-act" data-id="${act.id}"></div>`) as HTMLDivElement
    d.appendChild(htmlToElement(`<span class="results-more-skills-act-content">${act.name}</span>`))
    d.addEventListener('click', () => { onMoreSkillsActClick(d) })
    resultContainer.appendChild(d)
  }
}

export const renderResults = (sets: ArmorSet[], skillData: StaticSkillData, searchParams: SearchConstraints, pinsOrExclActive: boolean) => {
  const resultContainer = clearAndGetResultsContainer()

  // add search param element
  resultContainer.appendChild(htmlToElement(`
    <div class="results-title">Results for ${searchParams.skillActivations.map(x => x.name).join(', ')} (${sets.length} matches)</div>
  `))

  // return if no results
  if (sets.length === 0) {
    resultContainer.appendChild(htmlToElement(`
      <div class="results-banner banner">
        No matching armor sets
      <div>
    `))

    if (pinsOrExclActive) resultContainer.appendChild(PINS_OR_EXCL_ACTIVE_BANNER)

    return
  }

  // build table and table header
  const table = htmlToElement('<table class="results-table" id="results-table"></table>')
  const header = htmlToElement('<tr><th>Head</th><th>Torso</th><th>Arms</th><th>Waist</th><th>Legs</th><th>Charm</th></tr>')
  resultContainer.appendChild(table)
  table.appendChild(header)

  // build and append html elements for each armor set
  sets
    .sort((a, b) => b.evaluation.defense.max - a.evaluation.defense.max)
    .map(set => getSetElement(set, skillData, searchParams))
    .forEach(ele => table.appendChild(ele))
}
