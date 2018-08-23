[![Coverage Status](https://coveralls.io/repos/github/microstates/todomvc/badge.svg?branch=tm%2Fupgrade-microstates)](https://coveralls.io/github/microstates/todomvc?branch=tm%2Fupgrade-microstates)

# TodoMVC Microstate

This package provides a Microstate model for state of a TodoMVC component. It includes tests and is published as `@microstates/todomvc` package. The purpose of this package is to show how a Microstate can be distributed via NPM. The state can be consumed by projects in different frameworks.

Learn more about Microstates.js at [microstates/microstates.js](http://github.com/microstates/todomvc).

## Installation

`npm install --save @microstates/todomvc`

or

`yarn add @microstates/todomvc`

## Getting Started

To use this model, you can import it and create a Microstate.

```js
import { create } from 'microstates'
import TodoMVC from '@microstate/todomvc'

let todomvc = create(TodoMVC)
```

## Tests

The Microstate comes with [tests](tests/todomvc-test.js) with 100% coverage.

```js
git clone git@github.com:microstates/todomvc.git
cd todomvc
npm install
npm test
```