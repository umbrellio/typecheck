/* eslint-env node */

module.exports = {
  browser: true,
  collectCoverageFrom: ['lib/**/*.js'],
  testMatch: ['<rootDir>/test/**/*.test.js'],
  moduleFileExtensions: ['js'],
  moduleNameMapper: {
    "typecheck": "<rootDir>/lib/index.js"
  },
  transform: {
    '\\.js$': 'babel-jest',
  },
}
