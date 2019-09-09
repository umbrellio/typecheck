export default class Type {
  constructor (checker) {
    this.checker = checker
  }

  __check (value) {
    return this.checker(value)
  }
}
