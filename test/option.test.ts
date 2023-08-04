import test from 'ava'
import T from '../lib/index.js'

test('checks option type correctly', t => {
  const type = T.Option(T.String)

  t.true(T.check(type, null))
  t.true(T.check(type, undefined))
  t.true(T.check(type, 'kek'))

  t.false(T.check(type, 1))
})
