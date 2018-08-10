import PropTypes from 'prop-types'
import React, { Component } from 'react'

/**
 * This is a generic form for submitting an email and password to the mutation
 * that's passed down in the props.
 * @extends Component
 */
class AuthForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }
  }
  onSubmit = (event) => {
    event.preventDefault()
    this.props.onSubmit(this.state)
  }
  render() {
    return (
      <form
        className="c-form"
        onSubmit={this.onSubmit}
      >

        <div className="o-input-field">
          <label className="o-input-label" htmlFor="email">Email:
            <input
              className="o-input"
              id="email"
              placeholder="you@somewhere.com"
              required
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </label>
        </div>

        <div className="o-input-field">
          <label className="o-input-label" htmlFor="password">Password:
            <input
              className="o-input"
              id="password"
              placeholder="Password"
              required
              type="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </label>
        </div>

        <div className="c-form-errors">
          {this.props.errors.map(error => <div key={error}>{error}</div>)}
        </div>

        <button className="o-button u-full-width u-margin-top">{this.props.buttonText}</button>

      </form>
    )
  }
}

export default AuthForm

/**
 * Define the property types.
 * @type {Object}
 */
AuthForm.propTypes = {
  buttonText: PropTypes.string,
  errors: PropTypes.array,
  onSubmit: PropTypes.func,
}

/**
 * Define the default values for the property types.
 * @type {Object}
 */
AuthForm.defaultProps = {
  buttonText: 'Log in',
  errors: [],
  onSubmit: () => {},
}
