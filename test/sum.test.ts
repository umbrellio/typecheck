import test from 'ava'
import T from '../lib/index.js'

test('correctly handles sum of types', t => {
  const type = T.Sum(T.String, T.Number)

  t.true(T.check(type, 1))
  t.true(T.check(type, 'kek'))

  t.false(T.check(type, null))
  t.false(T.check(type, [1, 'kek']))
})

test('correctly handles sum of values', t => {
  const type = T.Sum(true, 'not true', 0)

  t.true(T.check(type, true))
  t.true(T.check(type, 'not true'))
  t.true(T.check(type, 0))

  t.false(T.check(type, 1))
  t.false(T.check(type, false))
  t.false(T.check(type, ''))
})

test('correctly handles sum of both types and values', t => {
  const type = T.Sum(0, T.Boolean)

  t.true(T.check(type, 0))
  t.true(T.check(type, true))
  t.true(T.check(type, false))

  t.false(T.check(type, 123))
  t.false(T.check(type, null))
})
