'use strict'

module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true
  },
  extends: ['prettier', 'plugin:import/errors', 'plugin:import/warnings'],
  plugins: ['import'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  globals: {
    ShadyCSS: true,
    skate: true
  }
}
