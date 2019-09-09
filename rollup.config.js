/* eslint-disable prefer-object-spread/prefer-object-spread */

import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

const shared = {
  input: 'lib/index.js',
  plugins: [
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    babel({
      exclude: 'node-modules/**'
    })
  ]
}

export default [
  Object.assign({}, shared, {
    output: {
      file: 'dist/typecheck.cjs.js',
      format: 'cjs'
    }
  }),
  Object.assign({}, shared, {
    output: {
      file: 'dist/typecheck.es.js',
      format: 'es'
    }
  }),
  Object.assign({}, shared, {
    output: {
      file: 'dist/typecheck.iife.js',
      format: 'iife',
      name: 'T'
    }
  })
]
