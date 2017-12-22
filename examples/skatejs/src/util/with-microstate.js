import microstate from 'microstates'
import { map } from 'funcadelic'
import shallowEqual from 'shallowequal'

export default function withMicrostate(Model, Class) {
  return class ClassWithMicrostate extends Class {
    state = {
      model: null,
      actions: null
    }
    constructor() {
      super()

      this.connectMicrostate(microstate(Model))
    }

    connectMicrostate(ms) {
      let shouldUpdate = !this.microstate || !shallowEqual(this.microstate.valueOf(), ms.valueOf())
      if (shouldUpdate) {
        this.microstate = ms
        this.state = {
          model: ms.state,
          actions: map(transition => (...args) => this.connectMicrostate(transition(...args)), ms)
        }
      }
    }
  }
}
