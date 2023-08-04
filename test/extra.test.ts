import test from 'ava'
import T from '../lib/index.js'

test('works correctly', t => {
  const TUser = T.Struct({
    email: T.String,
    nickname: T.Option(T.String),
    age: T.Option(T.Sum(T.Number, T.String)),
    role: T.Sum('admin', 'support'),
  })

  const validUsers = [
    {
      email: 'cow@cow.cow',
      nickname: null,
      age: null,
      role: 'support',
    },
    {
      email: 'cow@gmail.com',
      nickname: 'cow',
      age: null,
      role: 'admin',
    },
    {
      email: '',
      nickname: 'cow',
      age: 12,
      role: 'admin',
    },
    {
      email: '',
      nickname: 'cow',
      age: '1ssss2',
      role: 'admin',
    },
  ]

  const invalidUsers = [
    {
      email: 'cow@cow.cow',
      nickname: 'cow',
      age: 12,
      role: 'kek',
    },
    {
      email: null,
      nickname: 'cow',
      age: 12,
      role: 'admin',
    },
    {
      email: 'cow@cow.cwo',
      nickname: 4,
      age: 12,
      role: 'admin',
    },
    {
      email: 'cow@cow.cwo',
      nickname: 'cow',
      age: 12,
    },
    {
      email: 'cow@cow.cow',
      nickname: 'cow',
      age: 12,
      role: 'admin',
      chepuha: true,
    },
    {
      email: 'cow@cow.cow',
      age: 12,
      role: 'admin',
      chepuha: true,
    },
  ]

  t.true(validUsers.every(u => T.check(TUser, u)))
  t.false(invalidUsers.some(u => T.check(TUser, u)))
})
