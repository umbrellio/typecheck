# typecheck [![Build Status](https://travis-ci.org/umbrellio/typecheck.svg?branch=master)](https://travis-ci.org/umbrellio/typecheck) [![Coverage Status](https://coveralls.io/repos/github/umbrellio/typecheck/badge.svg?branch=master)](https://coveralls.io/github/umbrellio/typecheck?branch=master)

Simple, strict, extensible runtime type checker for JavaScript.

## Basic usage

```javascript
import T from '@umbrellio/typecheck'

// define a type
const userType = T.Schema({
  email: T.String,
  password: T.String,
  age: T.Option(T.Number),
  role: T.Sum("admin", "support"),
})

// run a type check
T.check(userType, { email: 'cow@cow.cow', password: '12345', age: 12, role: "admin" }) // => true
```

## Installation

Install with yarn:

```sh
$ yarn add @umbrellio/typecheck
# or with npm:
$ npm i -S @umbrellio/typecheck
```

You can also try the library out via [unpkg](https://unpkg.com):
```html
<script src="https://unpkg.com/typecheck"></script>
```

## Built-in type reference

### Primitive types

- T.String: `kek`, `new String('pek')`
- T.Number: `69`, `new Number(100)`, `-2131.31`
- T.Boolean: `true`, `false`

### Arrays

Signature: `T.Array(type)`

```javascript
T.Array(T.String) // [], ['kek', 'pek']
T.Array(T.Sum(T.Boolean, T.Number)) // [], [true, 1]
```

### Option

Signature: `T.Option(type)`

```javascript
T.Option(T.String) // null, undefined, 'some string'
T.Option(T.Array(T.Number)) // null, undefined, [], [69]
```

### Struct

Signature: `T.Struct(schema)` where `schema` is an object

```javascript
T.Struct({ name: T.String }) // { name: 'Ivan' }
T.Struct({ email: T.String, age: T.Option(T.Number) }) // { email: 'ivan@ivan.ru', age: 69 }
```

### Sum

Signature: `T.Sum(...types)`

```javascript
T.Sum(T.Number, T.String, T.Schema({ name: T.String })) // 69, '69', { name: 'ivan' }
```

## Advanced usage

### Custom types

```javascript
import T from '@umbrellio/typecheck'

// age is a positive number
const Age = new T.Type(v => T.check(T.Number, v) && v > 0)

const userType = T.Struct({
  email: T.String,
  age: T.Option(Age),
})
```

## TODO

- Global type registry (aka custom types inside the `T` object)
- More convenient composition for custom types
- Success/Failure API
- Type coercion API?

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/umbrellio/typecheck.

## License

Released under MIT License.

## Authors

Created by Alexander Komarov.

<a href="https://github.com/umbrellio/">
<img style="float: left;" src="https://umbrellio.github.io/Umbrellio/supported_by_umbrellio.svg" alt="Supported by Umbrellio" width="439" height="72">
</a>
