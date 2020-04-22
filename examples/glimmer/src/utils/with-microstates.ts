import microstate from 'microstates'
import { map } from 'funcadelic'
import shallowEqual from 'shallowequal'
import Component, { tracked } from '@glimmer/component'

export default function withMicrostate(Model, Class) {
  class ClassWithMicrostate extends Class {
    @tracked private ms

    @tracked('ms')
    get model() {
      return this.ms.state
    }

    constructor(options) {
      super(options)
      this.ms = microstate(Model, Class.props)
    }

    @tracked('ms')
    get actions() {
      console.log(`recompute`, this, this.ms)
      return map(
        transition => (...args) => {
          this.ms = transition(...args)
        },
        this.ms
      )
    }
  }

  // We return here so that typescript will allow decorators to be used in the class
  return ClassWithMicrostate
}
