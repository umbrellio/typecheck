import test from 'ava'
import T from '../lib/index.js'

test('checks array type correctly', t => {
  const type = T.Array(T.String)

  t.true(T.check(type, ['kek', 'pek']))
  t.true(T.check(type, new Array('cheburek')))
  t.true(T.check(type, []))

  t.false(T.check(type, ['kek', 1]))
  t.false(T.check(type, [null]))
  t.false(T.check(type, 'kek'))
  t.false(T.check(type, undefined))
})
