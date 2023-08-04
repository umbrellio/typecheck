import { IType } from './type.js'

export function isObject(v: unknown): v is Record<string, unknown> {
  return Object.prototype.toString.call(v) === '[object Object]'
}

export function isType(v: unknown): v is IType {
  return isObject(v) && '__check' in v
}

export function hasOwnProperty(obj: Object, prop: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}
