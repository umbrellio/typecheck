type TypeCheckFn = (value: unknown) => boolean

export interface IType {
  __check(value: unknown): boolean
}

export default class Type implements IType {
  checker: TypeCheckFn

  constructor(checker: TypeCheckFn) {
    this.checker = checker
  }

  __check(value: unknown) {
    return this.checker(value)
  }
}
