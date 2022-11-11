import { range } from '../../../helper/range.helper'
import Skill from '../skills/Skill'
import SkillNameMap from '../skills/SkillNameMap'
import Charm from './Charm'
import EquipmentCategory from './EquipmentCategory'
import Slots from './Slots'

export default class UserCharmList {
  // eslint-disable-next-line no-use-before-define
  private static _instance: UserCharmList

  private list: Charm[]

  private constructor () {
    this.list = []
  }

  public static get Instance () {
    return this._instance || (this._instance = new this())
  }

  /** get the list of charms */
  get () {
    return this.list
  }

  /** adds a given charm to list */
  add (charm: Charm): number {
    return this.list.push(charm)
  }

  /** removes charm at specified index from list */
  remove (index: number) {
    this.list = this.list.filter((_, i) => i !== index)
  }

  /** serializes charm list as csv */
  serialize (): string {
    return this.list.map((charm) => {
      const s = []

      const skillArray = Array.from(charm.skills.entries())
      for (const skill of skillArray) {
        s.push(`${skill[1].name},${skill[1].points},`)
      }

      const amountOfSkills = skillArray.length
      // eslint-disable-next-line no-unused-vars
      for (const _ in range(amountOfSkills, 2)) {
        s.push(',,')
      }

      s.push(`${charm.slots}`)

      return s.join('')
    }).join('\n')
  }

  /** populate charm list from csv */
  deserialize (csv: string, skillNames: SkillNameMap): Charm[] {
    const newList = []

    for (const charm of csv.split('\n')) {
      const spl = charm.split(',')

      const slots = parseInt(spl[4])
      const skills = [[0, 1], [2, 3]]
        .filter(([_, j]) => !isNaN(parseInt(spl[j])))
        .map(([i, j]) => {
          const name = spl[i]

          const id = Array.from(skillNames.entries())
            .find(([_, n]) => {
              return n === name
            })![0]

          // build skill model
          const skill: Skill = {
            name,
            points: parseInt(spl[j]),
            id,
          }
          return skill
        })

      const newCharm: Charm = {
        name: 'charm',
        category: EquipmentCategory.CHARM,
        slots: slots as Slots,
        rarity: 0,
        skills: new Map(skills.map((skill) => {
          return [skill.id, {
            id: skill.id,
            name: skillNames.get(skill.id)!,
            points: skill.points,
          }]
        })),
      }

      newList.push(newCharm)
    }

    this.list = newList
    return newList
  }
}
