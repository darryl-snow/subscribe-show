// Dependencies
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'

// App components
import history from '../../history'
import query from '../../queries/currentUser'

/**
 * This is a wrapper on the router to redirect any visits to a protected route
 * to the login page if the user is not logged in.
 * @param  {object} WrappedComponent The component for the protected route.
 */
export default (WrappedComponent) => {
  class RequireAuth extends Component {
    componentWillUpdate(nextProps) {
      if (!nextProps.data.loading && !nextProps.data.user) {
        history.push('/login', { previous: this.props.location.pathname })
      }
    }
    render() {
      return this.props.data.loading ? <div /> : <WrappedComponent {...this.props} />
    }
  }

  /**
   * Define the property types.
   * @type {Object}
   */
  RequireAuth.propTypes = {
    data: PropTypes.object,
    location: PropTypes.object,
  }

  /**
   * Define the default values for the property types.
   * @type {Object}
   */
  RequireAuth.defaultProps = {
    data: {},
    location: {},
  }

  return graphql(query)(RequireAuth)
}
