import { Component, createElement } from 'react'
import { map } from 'funcadelic'
import hoistStatics from 'hoist-non-react-statics'
import microstate from 'microstates'
import createBrowserHistory from 'history/createBrowserHistory'

export default function connect(Model, WrappedComponent) {
  class Connect extends Component {
    constructor(props, context) {
      super(props, context)

      this.history = createBrowserHistory()
      this.setMicrostate(
        microstate(Model, {
          ...props,
          location: this.history.location
        })
      )
    }

    setMicrostate(ms) {
      this.microstate = ms

      this.actions = map(
        transition => (...args) => {
          let ms = transition(...args)
          this.setMicrostate(ms)
          this.setState({})
        },
        ms
      )
    }

    historyListener = location => {
      this.actions.location.set(location)
    }

    componentWillMount() {
      this.unlisten = this.history.listen(this.historyListener)
    }

    componentWillUnmount() {
      this.unlisten()
    }

    componentWillReceiveProps(props) {
      this.actions.set(props)
    }

    render() {
      return createElement(WrappedComponent, {
        model: this.microstate.state,
        actions: this.actions,
        history: this.history,
        ...this.props
      })
    }
  }

  Connect.WrappedComponent = WrappedComponent

  return hoistStatics(Connect, WrappedComponent)
}
