import test from 'ava'
import T from '../lib/index.js'

test('checks empty structs correctly', t => {
  const type = T.Struct({})

  t.true(T.check(type, {}))

  t.false(T.check(type, 1))
  t.false(T.check(type, { 1: 2 }))
})

test('checks non-empty structs correctly', t => {
  const type = T.Struct({
    email: T.String,
    age: T.Number,
  })

  t.true(T.check(type, { email: 'cow@cow.cow', age: 12 }))

  t.false(T.check(type, 1))
  t.false(T.check(type, { email: 'cow@cow.cow', age: '12' }))
  t.false(T.check(type, { email: 'cow@cow.cow', age: 12, password: '1' }))
  t.false(T.check(type, { email: 'cow@cow.cow' }))
})
