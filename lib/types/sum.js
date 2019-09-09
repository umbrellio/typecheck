export default class Sum {
  constructor (values) {
    this.values = values
  }

  __check (value) {
    return this.values.some(v => {
      if (v.__check !== undefined) { // v is a Type
        return v.__check(value)
      } else {
        return v === value
      }
    })
  }
}
