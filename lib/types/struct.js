import { checkObjectType, hasOwnProperty } from '../util'

export default class Struct {
  constructor (definition) {
    this.definition = definition
    this.definitionKeys = Object.keys(definition)
    this.definitionKeysLen = this.definitionKeys.length
  }

  __check (value) {
    if (!checkObjectType(value, 'Object')) return false
    if (this.definitionKeysLen !== Object.keys(value).length) return false

    for (let i = 0; i < this.definitionKeysLen; i += 1) {
      const key = this.definitionKeys[i]
      if (!hasOwnProperty(value, key)) return false

      if (!this.definition[key].__check(value[key])) return false
    }

    return true
  }
}
