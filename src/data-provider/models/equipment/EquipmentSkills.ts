import GameID from '../GameId'
import Skill from '../skills/Skill'

export default class EquipmentSkills extends Map<GameID, Skill> {
  get (key: GameID): Skill {
    return super.get(key) || 0
  }

  add (key: GameID, val: Skill) {
    this.set(key, val + this.get(key))
  }

  addSkills (m: EquipmentSkills) {
    for (const [k, v] of m) {
      this.add(k, v)
    }
  }

  substract (key: GameID, val: Skill) {
    this.set(key, val + this.get(key))
  }

  substractSkills (m: EquipmentSkills) {
    for (const [k, v] of m) {
      this.substract(k, v)
    }
  }
}
