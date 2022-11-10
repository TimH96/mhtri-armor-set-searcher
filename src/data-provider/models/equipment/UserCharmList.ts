import { range } from '../../../helper/range.helper'
import Charm from './Charm'

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
  serialize () {
    return this.list.map((charm) => {
      let s = []

      const skillArray = Array.from(charm.skills.entries())
      for (const skill of skillArray) {
        s.push(`${skill[1].name},${skill[1].points},`)
      }

      const amountOfSkills = skillArray.length
      // eslint-disable-next-line no-unused-vars
      for (const _ in range(amountOfSkills, 2)) {
        s.push(`,,`)
      }

      s.push(`${charm.slots}`)

      return s.join("")
    }).join("\n")
  }
}
