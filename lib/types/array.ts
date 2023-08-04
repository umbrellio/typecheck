import { IType } from '../type.js'
export default class TArray implements IType {
  type: IType

  constructor(type: IType) {
    this.type = type
  }

  __check(value: unknown) {
    if (!Array.isArray(value)) return false

    return value.every(v => this.type.__check(v))
  }
}
