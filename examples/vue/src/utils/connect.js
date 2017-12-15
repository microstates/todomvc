import { map } from 'funcadelic'
import microstate from 'microstates'

export default function connect(Model, Component) {
  return {
    ...Component,
    data() {
      return {
        microstate: microstate(Model),
        ...Component.data(),
      }
    },
    computed: {
      state() {
        return this.microstate.state
      },
      actions() {
        return map(
          transition => (...args) => (this.microstate = transition(...args)),
          this.microstate
        )
      },
    },
  }
}
