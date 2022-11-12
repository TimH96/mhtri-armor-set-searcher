import ArmorSet from '../../searcher/models/ArmorSet'
import SearchConstraints from '../../searcher/models/SearchConstraints'
import StaticSkillData from '../../searcher/models/StaticSkillData'
import { htmlToElement } from './html.helper'

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
  // TODO build list
  console.log(sets)
}
