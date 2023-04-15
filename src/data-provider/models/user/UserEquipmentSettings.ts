import EquipmentCategory from '../equipment/EquipmentCategory'
import EquipmentMin from '../equipment/EquipmentMin'

export default class UserEquipmentSettings {
  // eslint-disable-next-line no-use-before-define
  private static _instance: UserEquipmentSettings

  pins: (EquipmentMin | undefined)[]

  exclusions: EquipmentMin[][]

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

  /** pins given equipment to corresponding category */
  addPin (x: EquipmentMin): void {
    this.pins[x.category] = x
  }

  /** removes pin of category */
  removePin (cat: EquipmentCategory): void {
    this.pins[cat] = undefined
  }

  /** adds given equipment to exclusion list of corresponding category */
  addExclusion (x: EquipmentMin): void {
    this.exclusions[x.category].push(x)
  }

  /** removes equipment from exclusion list */
  removeExclusion (x: EquipmentMin): void {
    const arr = this.exclusions[x.category]
    const index = arr.findIndex((y) => y.name === x.name)
    this.exclusions[x.category].splice(index, 1)
  }

  /** returns true if pin is same as given element */
  hasPin (x: EquipmentMin | undefined): boolean {
    if (!x) return false
    if (x.isGeneric) return false

    const pin = this.pins[x.category]
    if (!pin) return false
    return pin.name === x.name
  }

  /** returns true if piece is already excluded */
  hasExclusion (x: EquipmentMin): boolean {
    return !!this.exclusions[x.category].find(y => y.name === x.name)
  }

  /** serializes settings as json */
  serialize (): string {
    return JSON.stringify({ pins: this.pins, exclusions: this.exclusions })
  }

  /** populate settings from json */
  deserialize (raw: string): void {
    const parsed = JSON.parse(raw) as {
      pins: (EquipmentMin | undefined)[];
      exclusions: EquipmentMin[][];

    }
    this.pins = parsed.pins
    this.exclusions = parsed.exclusions
  }
}
