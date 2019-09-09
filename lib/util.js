export const checkObjectType = (v, type) => Object.prototype.toString.call(v) === `[object ${type}]`

export const hasOwnProperty = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
