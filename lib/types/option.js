export default class Option {
  constructor (type) {
    this.type = type
  }

  __check (value) {
    if (value === null) return true
    if (value === undefined) return true

    return this.type.__check(value)
  }
}
