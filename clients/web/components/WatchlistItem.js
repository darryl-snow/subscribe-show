// Dependencies
import React from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import query from '../queries/getWatchlistItem'

import Loader from './Loader/Loader'
import WatchlistItemHeader from './WatchlistItem/WatchlistItemHeader'

/**
 * The Watchlist Item component is a higher-order component that simply passes
 * data into Watchlist Item Header and ListContainer component.
 */
export default (PassedComponent) => {
  const WatchListItem = (props) => {
    if (props.data.loading) {
      return (
        <Loader />
      )
    }
    return (
      <div className="c-watchlistitem">
        <WatchlistItemHeader {...props.data.watchListItem} />
        <PassedComponent episodes={props.data.watchListItem.episodes} />
      </div>
    )
  }

  /**
   * Define the property types.
   * @type {Object}
   */
  WatchListItem.propTypes = {
    data: PropTypes.object,
  }

  /**
   * Define default values for each property.
   * @type {Object}
   */
  WatchListItem.defaultProps = {
    data: {
      loading: true,
      episodes: [],
      watchlistitem: {},
    },
  }

  // Append results of the graphQL query to the component properties.
  return graphql(query, {
    options: (props) => {
      const { id } = props.match.params
      return { variables: { id } }
    },
  })(WatchListItem)
}
