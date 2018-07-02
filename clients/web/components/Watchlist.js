// Dependencies
import React from 'react'
import { graphql } from 'react-apollo'
import query from '../queries/getWatchlistItems'

/**
 * The WatchList component is a higher-order component that simply passes
 * data into a ListContainer component.
 */
export default (PassedComponent) => {
  const WatchList = (props) => {
    const title = 'My Watchlist'
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

  // Append results of the graphQL query to the component properties.
  return graphql(query)(WatchList)
}
