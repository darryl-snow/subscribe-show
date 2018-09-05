// Dependencies
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'

// Queries & mutations
import mutation from '../../mutations/login'
import query from '../../queries/currentUser'

// App components
import AuthForm from './AuthForm'
import history from '../../history'
import Loader from '../Loader/Loader'

/**
 * This component presents a login form, which is actually just a wrapper
 * around a more generic Auth form - this just passes the login method to the
 * form.
 * @extends Component
 */
export class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: [],
      loading: false,
    }

    ReactGA.pageview('Login')
  }
  onSubmit = ({ email, password }) => {
    // Set the loading state when the login button is clicked.
    this.setState({
      loading: true,
    })

    // Log the event.
    ReactGA.event({
      category: 'Auth Form',
      action: 'Tap Login Button',
    })

    // Call the login mutation.
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query }],
    }).then(() => {
      const { state } = this.props.location

      const previousLocation = state ? state.previous : null

      // Log the event.
      ReactGA.event({
        category: 'Auth Form',
        action: 'Logged In',
        label: previousLocation,
        nonInteraction: true,
      })

      if (previousLocation) {
        history.push(previousLocation)
      } else {
        history.push('/')
      }
    }).catch((res) => {
      const errors = Object.values(res.graphQLErrors).map(error => error.message)

      // Log the event.
      ReactGA.event({
        category: 'Auth Form',
        action: 'Not Logged In',
        label: errors[0],
        nonInteraction: true,
      })

      this.setState({
        errors,
        loading: false,
      })
    })
  }
  render() {
    // If the mutation (state) or query (props) is in progress then show the loader.
    if (this.props.data.loading || this.state.loading) {
      return (
        <Loader />
      )
    }
    // Otherwise render the login form.
    return (
      <div className="u-align--center u-display--flex u-magic-padding">
        <div className="o-panel u-align--left u-padding">
          <AuthForm
            buttonText="Log in"
            errors={this.state.errors}
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    )
  }
}

export default graphql(mutation)(graphql(query)(Login))

/**
 * Define the property types.
 * @type {Object}
 */
Login.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
  mutate: PropTypes.func,
}

/**
 * Define the default values for the property types.
 * @type {Object}
 */
Login.defaultProps = {
  data: {},
  location: {
    state: {
      previous: null,
    },
  },
  mutate: () => {},
}
