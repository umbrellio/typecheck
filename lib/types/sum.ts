import { isType } from '../util.js'
import { IType } from '../type.js'

export default class Sum implements IType {
  values: unknown[]

  constructor(values: unknown[]) {
    this.values = values
  }

  __check(value: unknown) {
    return this.values.some(v => {
      if (isType(v)) {
        return v.__check(value)
      } else {
        return v === value
      }
    })
  }
}
