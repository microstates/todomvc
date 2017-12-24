import microstate from 'microstates'
import { map } from 'funcadelic'
import shallowEqual from 'shallowequal'

export default function withMicrostate(Model, Class) {
  return class ClassWithMicrostate extends Class {
    rendering() {
      if (!this._rendered) {
        this.microstate = microstate(Model, this.props)

        this.state = {
          model: this.microstate.state,
          actions: this.actions
        }
        this._rendered = true
      }
    }

    get actions() {
      return map(
        transition => (...args) => {
          this.microstate = transition(...args)
          this.state = {
            model: this.microstate.state,
            actions: this.actions
          }
        },
        this.microstate
      )
    }
  }
}
