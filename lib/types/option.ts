import { IType } from '../type.js'
export default class Option implements IType {
  type: IType

  constructor(type: IType) {
    this.type = type
  }

  __check(value: unknown) {
    if (value === null) return true
    if (value === undefined) return true

    return this.type.__check(value)
  }
}
