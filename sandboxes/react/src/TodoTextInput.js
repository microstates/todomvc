import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TodoTextInput extends Component {
  static propTypes = {
    onSave: PropTypes.func.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    text: PropTypes.string,
    placeholder: PropTypes.string
  }

  handleSubmit = e => {
    if (e.which === 13) {
      this.props.onSave(e.target.value)
    }
  }

  handleChange = e => {
    this.props.onInputChange(e.target.value)
  }

  handleBlur = e => {
    if (this.props.onBlur) {
      this.props.onBlur(e.target.value)
    }
  }

  render() {
    return (
      <input
        className={this.props.classes}
        type="text"
        placeholder={this.props.placeholder}
        autoFocus={true}
        value={this.props.text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
      />
    )
  }
}
