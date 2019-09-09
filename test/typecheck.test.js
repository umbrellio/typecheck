import T from "typecheck"

describe("typecheck", () => {
  describe("primitive types", () => {
    it("checks String type correctly", () => {
      const strings = ["kek", `pek`, new String("cheburek"), "1"]
      const notStrings = [1, true, null, {}, ["kek"], undefined]

      expect(strings.every(s => T.check(T.String, s))).toBe(true)
      expect(notStrings.some(s => T.check(T.String, s))).toBe(false)
    })

    it("checks Number type correctly", () => {
      const numbers = [1, 0.32, new Number(69)]
      const notNumbers = ["1", "kek", {}, [12], null, undefined]

      expect(numbers.every(n => T.check(T.Number, n))).toBe(true)
      expect(notNumbers.some(n => T.check(T.Number, n))).toBe(false)
    })

    it("checks Boolean type correctly", () => {
      const booleans = [true, false, new Boolean()]
      const notBooleans = [{}, [], 1, 0, "", "12312dfa"]

      expect(booleans.every(b => T.check(T.Boolean, b))).toBe(true)
      expect(notBooleans.some(b => T.check(T.Boolean, b))).toBe(false)
    })
  })

  describe("complex types", () => {
    describe("Array", () => {
      it("checks array type correctly", () => {
        const t = T.Array(T.String)

        expect(T.check(t, ["kek", "pek"])).toBe(true)
        expect(T.check(t, new Array("cheburek"))).toBe(true)
        expect(T.check(t, [])).toBe(true)

        expect(T.check(t, ["kek", 1])).toBe(false)
        expect(T.check(t, [null])).toBe(false)
        expect(T.check(t, "kek")).toBe(false)
        expect(T.check(t, undefined)).toBe(false)
      })
    })

    describe("Sum", () => {
      it("correctly handles sum of types", () => {
        const t = T.Sum(T.String, T.Number)

        expect(T.check(t, 1)).toBe(true)
        expect(T.check(t, "kek")).toBe(true)

        expect(T.check(t, null)).toBe(false)
        expect(T.check(t, [1, "kek"])).toBe(false)
      })

      it("correctly handles sum of values", () => {
        const t = T.Sum(true, "not true", 0)

        expect(T.check(t, true)).toBe(true)
        expect(T.check(t, "not true")).toBe(true)
        expect(T.check(t, 0)).toBe(true)

        expect(T.check(t, 1)).toBe(false)
        expect(T.check(t, false)).toBe(false)
        expect(T.check(t, "")).toBe(false)
      })

      it("correctly handles sum of both types and values", () => {
        const t = T.Sum(0, T.Boolean)

        expect(T.check(t, 0)).toBe(true)
        expect(T.check(t, true)).toBe(true)
        expect(T.check(t, false)).toBe(true)

        expect(T.check(t, 123)).toBe(false)
        expect(T.check(t, null)).toBe(false)
      })
    })

    describe("Option", () => {
      it("checks option type correctly", () => {
        const t = T.Option(T.String)

        expect(T.check(t, null)).toBe(true)
        expect(T.check(t, undefined)).toBe(true)
        expect(T.check(t, "kek")).toBe(true)

        expect(T.check(t, 1)).toBe(false)
      })
    })

    describe("Struct", () => {
      it("checks empty structs correctly", () => {
        const t = T.Struct({})

        expect(T.check(t, {})).toBe(true)

        expect(T.check(t, 1)).toBe(false)
        expect(T.check(t, { 1: 2 })).toBe(false)
      })

      it("checks non-empty structs correctly", () => {
        const t = T.Struct({
          email: T.String,
          age: T.Number,
        })

        expect(T.check(t, { email: "cow@cow.cow", age: 12 })).toBe(true)

        expect(T.check(t, 1)).toBe(false)
        expect(T.check(t, { email: "cow@cow.cow", age: "12" })).toBe(false)
        expect(T.check(t, { email: "cow@cow.cow", age: 12, password: "1" })).toBe(false)
        expect(T.check(t, { email: "cow@cow.cow" })).toBe(false)
      })
    })
  })

  describe("deep types", () => {
    it("works correctly", () => {
      const TUser = T.Struct({
        email: T.String,
        nickname: T.Option(T.String),
        age: T.Option(T.Sum(T.Number, T.String)),
        role: T.Sum("admin", "support"),
      })

      const validUsers = [
        {
          email: "cow@cow.cow",
          nickname: null,
          age: null,
          role: "support",
        },
        {
          email: "cow@gmail.com",
          nickname: "cow",
          age: null,
          role: "admin",
        },
        {
          email: "",
          nickname: "cow",
          age: 12,
          role: "admin",
        },
        {
          email: "",
          nickname: "cow",
          age: "1ssss2",
          role: "admin",
        },
      ]

      const invalidUsers = [
        {
          email: "cow@cow.cow",
          nickname: "cow",
          age: 12,
          role: "kek",
        },
        {
          email: null,
          nickname: "cow",
          age: 12,
          role: "admin",
        },
        {
          email: "cow@cow.cwo",
          nickname: 4,
          age: 12,
          role: "admin",
        },
        {
          email: "cow@cow.cwo",
          nickname: "cow",
          age: 12,
        },
        {
          email: "cow@cow.cow",
          nickname: "cow",
          age: 12,
          role: "admin",
          chepuha: true,
        },
        {
          email: "cow@cow.cow",
          age: 12,
          role: "admin",
          chepuha: true,
        },
      ]

      expect(validUsers.every(u => T.check(TUser, u))).toBe(true)
      expect(invalidUsers.some(u => T.check(TUser, u))).toBe(false)
    })
  })
})
