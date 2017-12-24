import { Component, createElement } from 'react'
import { map } from 'funcadelic'
import hoistStatics from 'hoist-non-react-statics'
import microstate from 'microstates'
import createBrowserHistory from 'history/createBrowserHistory'
import qs from 'qs'

/**
 * Connect function creates a wrapper around a React Component. This wrapper
 * manages the microstate and ensuring that invoked transitions re-render the
 * wrapped component.
 *
 * @param {Microstate} Model
 * @param {ReactComponent} WrappedComponent
 */
export default function connect(Model, WrappedComponent) {
  class Connect extends Component {
    constructor(props, context) {
      super(props, context)

      /**
       * Creating a history object allows us to listen to url changes and
       * update the filter property when the query parameter changes.
       */
      this.history = createBrowserHistory()

      /**
       * Create microstate with initial state. This is what the users will see when
       * the app first loads.
       */
      this.microstate = microstate(Model, {
        ...props,
        ...this.queryParams
      })
    }

    /**
     * Extracts query params from History Location
     */
    get queryParams() {
      return qs.parse(this.history.location.search, { ignoreQueryPrefix: true })
    }

    /**
     * Actions are transitions that are wrapped with code that'll cause the component to rerender.
     */
    get actions() {
      return map(
        transition => (...args) => {
          this.microstate = transition(...args)
          this.forceUpdate()
        },
        this.microstate
      )
    }

    /**
     * When history changes, update the filter property with value of filter from query params.
     */
    historyListener = () => {
      this.actions.filter.set(this.queryParams.filter)
    }

    componentWillMount() {
      /**
       * Setup history listener when component is rendered
       */
      this.unlisten = this.history.listen(this.historyListener)
    }

    componentWillUnmount() {
      /**
       * Cleanup the listeners
       */
      this.unlisten()
      this.unlisten = null
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
