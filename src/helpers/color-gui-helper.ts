export class ColorGuiHelper {
  object: any
  prop: any

  constructor(object: any, prop: any) {
    this.object = object
    this.prop = prop
  }

  get value(): string {
    return `#${this.object[this.prop].getHexString()}`
  }
  set value(hexString: string) {
    this.object[this.prop].set(hexString)
  }
}
