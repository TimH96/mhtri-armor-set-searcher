import EquipmentCategory from '../equipment/EquipmentCategory'
import Equipment from '../equipment/Equipment'

export default class UserSettings {
  // eslint-disable-next-line no-use-before-define
  private static _instance: UserSettings

  private pins: (Equipment | undefined)[]

  private exclusions: Equipment[][]

  isActive: boolean

  private constructor () {
    this.pins = []
    this.exclusions = []

    const supportedCategoires = [
      EquipmentCategory.HEAD,
      EquipmentCategory.CHEST,
      EquipmentCategory.ARMS,
      EquipmentCategory.WAIST,
      EquipmentCategory.LEGS,
    ]

    supportedCategoires.forEach((_) => {
      this.pins.push(undefined)
      this.exclusions.push([])
    })

    this.isActive = false
  }

  public static get Instance () {
    return this._instance || (this._instance = new this())
  }

  private activate () {
    this.isActive = true
  }

  private evaluateActivation () {
    this.isActive = !(
      this.pins.every((x) => x === undefined) &&
      this.exclusions.every((x) => x.length === 0)
    )
  }

  /** pins given equipment to corresponding category */
  addPin (x: Equipment): void {
    this.pins[x.category] = x
    this.activate()
  }

  /** removes pin of category */
  removePin (cat: EquipmentCategory): void {
    this.pins[cat] = undefined
    this.evaluateActivation()
  }

  /** adds given equipment to exclusion list of corresponding category */
  addExclusion (x: Equipment): void {
    this.exclusions[x.category].push(x)
    this.activate()
  }

  /** removes equipment from exclusion list */
  removeExclusion (x: Equipment): void {
    const arr = this.exclusions[x.category]
    const index = arr.findIndex((y) => y.name === x.name)
    this.exclusions[x.category].splice(index, 1)
    this.evaluateActivation()
  }

  /** serializes settings as json */
  serialize (): string {
    return JSON.stringify({ pins: this.pins, exclusions: this.exclusions })
  }

  /** populate settings from json */
  deserialize (raw: string): void {
    const parsed = JSON.parse(raw) as {
      pins: (Equipment | undefined)[];
      exclusions: Equipment[][];
    }
    this.pins = parsed.pins
    this.exclusions = parsed.exclusions
    this.evaluateActivation()
  }
}
