import { checkObjectType } from '../util'

export default class Array {
  constructor (type) {
    this.type = type
  }

  __check (value) {
    if (!checkObjectType(value, 'Array')) return false

    return value.every(v => this.type.__check(v))
  }
}
