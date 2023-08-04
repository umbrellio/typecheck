import { hasOwnProperty, isObject } from '../util.js'
import { IType } from '../type.js'

export default class Struct implements IType {
  definition: Record<string, IType>
  definitionKeys: string[]
  definitionKeysLen: number

  constructor(definition: Record<string, IType>) {
    this.definition = definition
    this.definitionKeys = Object.keys(definition)
    this.definitionKeysLen = this.definitionKeys.length
  }

  __check(value: unknown) {
    if (!isObject(value)) return false
    if (this.definitionKeysLen !== Object.keys(value).length) return false

    for (let i = 0; i < this.definitionKeysLen; i += 1) {
      const key = this.definitionKeys[i]
      if (!hasOwnProperty(value, key)) return false

      if (!this.definition[key].__check(value[key])) return false
    }

    return true
  }
}
