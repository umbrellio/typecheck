import test from 'ava'
import T from '../lib/index.js'

test('checks String type correctly', t => {
  const strings = ['kek', `pek`, new String('cheburek'), '1']
  const notStrings = [1, true, null, {}, ['kek'], undefined]

  t.true(strings.every(s => T.check(T.String, s)))
  t.false(notStrings.some(s => T.check(T.String, s)))
})

test('checks Number type correctly', t => {
  const numbers = [1, 0.32, new Number(69)]
  const notNumbers = ['1', 'kek', {}, [12], null, undefined]

  t.true(numbers.every(n => T.check(T.Number, n)))
  t.false(notNumbers.some(n => T.check(T.Number, n)))
})

test('checks Boolean type correctly', t => {
  const booleans = [true, false, new Boolean()]
  const notBooleans = [{}, [], 1, 0, '', '12312dfa']

  t.true(booleans.every(b => T.check(T.Boolean, b)))
  t.false(notBooleans.some(b => T.check(T.Boolean, b)))
})
