// Dependencies
import PropTypes from 'prop-types'
import React from 'react'
import { graphql } from 'react-apollo'
import { Route } from 'react-router-dom'

// Queries
import query from '../queries/CurrentUser'

// App components
import List from './List/ListContainer'
import Loader from './Loader/Loader'
import Login from './Auth/Login'
import UnwatchedItems from './UnwatchedItems'

/**
 * This component is the landing page. If not logged in, it renders a login form
 * otherwise is renders the logged in user's list of unwatched items.
 */
export const Home = (props) => {
  // Show the loader if props are loading.
  if (props.data.loading) {
    return <Loader />
  }
  // No logged in user; render the login form.
  if (!props.data.user) {
    return <Login />
  }
  // User is logged in, render the list of unwatched items.
  return <Route path="/" component={UnwatchedItems(List)} />
}

export default graphql(query)(Home)

/**
 * Define the property types.
 * @type {Object}
 */
Home.propTypes = {
  data: PropTypes.object,
}

/**
 * Define the default values for the property types.
 * @type {Object}
 */
Home.defaultProps = {
  data: {},
}
