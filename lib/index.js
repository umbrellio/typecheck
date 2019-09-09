import Type from "./type"

import ArrayType from "./types/array"
import Sum from "./types/sum"
import Option from "./types/option"
import Struct from "./types/struct"

import { checkObjectType } from "./util"

export default {
  check (type, value) {
    return type.__check(value)
  },
  Type,

  String: new Type(v => checkObjectType(v, "String")),
  Number: new Type(v => checkObjectType(v, "Number")),
  Boolean: new Type(v => checkObjectType(v, "Boolean")),

  Array: type => new ArrayType(type),
  Sum: (...types) => new Sum(types),
  Option: type => new Option(type),
  Struct: type => new Struct(type),
}
