import Type, { IType } from './type.js'

import ArrayType from './types/array.js'
import Sum from './types/sum.js'
import Option from './types/option.js'
import Struct from './types/struct.js'

export default {
  check(type: IType, value: unknown): boolean {
    return type.__check(value)
  },
  Type,

  String: new Type(
    v => Object.prototype.toString.call(v) === '[object String]'
  ),
  Number: new Type(
    v => Object.prototype.toString.call(v) === '[object Number]'
  ),
  Boolean: new Type(
    v => Object.prototype.toString.call(v) === '[object Boolean]'
  ),

  Array: (type: IType) => new ArrayType(type),
  Sum: (...types: unknown[]) => new Sum(types),
  Option: (type: IType) => new Option(type),
  Struct: (def: Record<string, IType>) => new Struct(def),
}
