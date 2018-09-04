// Dependencies
import React from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'

// Queries
import query from '../queries/getWatchlistItems'

/**
 * The WatchList component is a higher-order component that simply passes
 * data into a ListContainer component.
 */
export default (PassedComponent) => {
  const WatchList = (props) => {
    const title = 'My Watchlist'

    if (!props.data.loading) {
      ReactGA.pageview('Watchlist')
    }

    return (
      <PassedComponent
        className="c-watchlist"
        sortBy="airDate"
        sortOrder={-1}
        query="watchListItems"
        title={title}
        {...props}
      />
    )
  }

  /**
   * Define the property types.
   * @type {Object}
   */
  WatchList.propTypes = {
    data: PropTypes.object,
  }

  /**
   * Define default values for each property.
   * @type {Object}
   */
  WatchList.defaultProps = {
    data: {
      loading: true,
    },
  }

  // Append results of the graphQL query to the component properties.
  return graphql(query, {
    options: {
      fetchPolicy: 'network-only',
    },
  })(WatchList)
}
