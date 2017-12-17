import { map } from 'funcadelic'
import microstate from 'microstates'

export default function connect(Model, Component) {
  return {
    ...Component,
    data() {
      let props = Component.props.reduce((acc, prop) => ({ ...acc, [prop]: this[prop] }), {})
      return {
        microstate: microstate(Model, props),
        ...((Component.data && Component.data()) || {})
      }
    },
    computed: {
      model() {
        return this.microstate.state
      },
      actions() {
        return map(
          transition => (...args) => (this.microstate = transition(...args)),
          this.microstate
        )
      }
    }
  }
}
