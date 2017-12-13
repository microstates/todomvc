import { Component, createElement } from 'react'
import { map, append } from 'funcadelic'
import hoistStatics from 'hoist-non-react-statics'
import microstate from 'microstates'

export default function connect(Model, WrappedComponent) {
  class Connect extends Component {
    constructor(props, context) {
      super(props, context)

      this.setMicrostate(microstate(Model, props))
      this.state = this.microstate.state
    }

    setMicrostate(ms) {
      this.microstate = ms

      this.actions = map(
        transition => (...args) => {
          let ms = transition(...args)
          this.setMicrostate(ms)
          this.setState(ms.state)
        },
        ms
      )
    }

    componentWillReceiveProps(props) {
      this.actions.set(props)
    }

    render() {
      return createElement(
        WrappedComponent,
        append(this.state, {
          actions: this.actions,
        })
      )
    }
  }

  Connect.WrappedComponent = WrappedComponent

  return hoistStatics(Connect, WrappedComponent)
}
