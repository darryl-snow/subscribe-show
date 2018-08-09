import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'

import history from '../../history'
import query from '../../queries/CurrentUser'

/**
 * This is a wrapper on the router to redirect any visits to a protected route
 * to the login page if the user is not logged in.
 * @param  {object} WrappedComponent The component for the protected route.
 */
export default (WrappedComponent) => {
  class RequireAuth extends Component {
    componentWillReceiveProps(nextProps) {
      if (!nextProps.data.loading && !nextProps.data.user) {
        history.push('/login')
      }
    }
    render() {
      return <WrappedComponent {...this.props} />
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
