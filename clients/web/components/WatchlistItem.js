// Dependencies
import React from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import query from '../queries/getWatchlistItemByTitle'

// App Components
import EmptyList from './EmptyList/EmptyList'
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
    if (!props.data.watchListItemByTitle.episodes) {
      return (
        <React.Fragment>
          <WatchlistItemHeader {...props.data.watchListItemByTitle} />
          <EmptyList message="No episodes to list." />
        </React.Fragment>
      )
    }
    return (
      <div className="c-watchlistitem">
        <WatchlistItemHeader {...props.data.watchListItemByTitle} />
        <PassedComponent episodes={props.data.watchListItemByTitle.episodes} />
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
      const { title } = props.match.params
      return {
        fetchPolicy: 'network-only',
        variables: { title },
      }
    },
  })(WatchListItem)
}
