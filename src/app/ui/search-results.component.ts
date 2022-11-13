import ArmorSet from '../../searcher/models/ArmorSet'
import SearchConstraints from '../../searcher/models/SearchConstraints'
import StaticSkillData from '../../searcher/models/StaticSkillData'
import { htmlToElement } from './html.helper'

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
  const skillRows = Array.from(set.evaluation.skills.entries())
    .sort(([_a, a], [_b, b]) => b - a)
    .map(([sId, sVal]) => {
      const r = document.createElement('tr')
      r.appendChild(htmlToElement(`<td>${skillData.skillName.get(sId) ? skillData.skillName.get(sId)! : ''}</td>`))
      r.appendChild(htmlToElement('<td></td>')) // weapon
      for (const p of set.getPieces()) {
        r.append(htmlToElement(`<td>${p.skills.get(sId) ? p.skills.get(sId)! : ''}</td>`))
      }
      r.append(htmlToElement(`<td>${set.charm.skills.get(sId) ? set.charm.skills.get(sId)! : ''}</td>`))
      r.append(htmlToElement('<td>deco</td>'))
      r.append(htmlToElement(`<td>${sVal}</td>`))
      const possibleAct = set.evaluation.activations.find(a => a.requiredSkill === sId)
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

  // return final div
  const tr = htmlToElement('<tr class="result-set-details"></tr>')
  const td = htmlToElement('<td colspan="6""></td>')
  const d = htmlToElement('<div class="result-set-details-container"></div>')
  d.appendChild(skillTable)
  td.appendChild(d)
  tr.appendChild(td)
  return tr
}

const getSetElement = (set: ArmorSet, skillData: StaticSkillData, searchParams: SearchConstraints) => {
  // get bonus and negative skills
  const requiredActivations = searchParams.skillActivations
  const unrelatedActivations = set.evaluation.activations.filter((act) => {
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

export const renderResults = (sets: ArmorSet[], skillData: StaticSkillData, searchParams: SearchConstraints) => {
  // get html container
  const resultContainer = document.getElementById('search-results')!

  // clear previous results
  for (const c of Array.from(resultContainer.children)) c.remove()

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
  }

  // build table and table header
  const table = htmlToElement('<table class="results-table" id="results-table"></table>')
  const header = htmlToElement('<tr><th>Head</th><th>Torso</th><th>Arms</th><th>Waist</th><th>Legs</th><th>Charm</th></tr>')
  table.appendChild(header)
  resultContainer.appendChild(table)

  // build and append html elements for each armor set
  sets.map(set => getSetElement(set, skillData, searchParams)).forEach(ele => table.appendChild(ele))
}
