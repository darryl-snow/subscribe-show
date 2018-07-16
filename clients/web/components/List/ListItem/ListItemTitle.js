// Dependencies
import React from 'react'
import PropTypes from 'prop-types'
import { formatDate, formatSeasonEpisodeNumbers, slugify } from '../../../helpers'

// App components
import Icon from '../../Icon/Icon'

/**
 * If the item is a search result (and has a tmdbID property) or a movie, then
 * the item title should be displayed. If it's a TV item from the watchlist
 * then the title should be wrapped in a link to the watchlist Item screen.
 */
const ListItemTitle = (props) => {
  const {
    airDate,
    episodeNumber,
    id,
    name,
    seasonNumber,
    title,
    type,
    watchlistItem,
  } = props

  if (type === 'Movie' || !id) {
    return (
      <h2>
        <Icon name="movie" className="u-margin-right--small" />
        {title || name}
        <span className="o-subheading">{formatDate(new Date(airDate))}</span>
      </h2>
    )
  }

  if (type === 'Episode') {
    return (
      <h2>
        <a className="o-link u-display--block" href={`/watch/${slugify(watchlistItem.title)}`} onClick={props.navigateToWatchListItem}>
          {watchlistItem.title}
          <Icon name="angle-right" className="o-link-icon" />
        </a>
        <Icon name="tv" className="u-margin-right--small" />
        {formatSeasonEpisodeNumbers(seasonNumber, episodeNumber)} : {title || name}
        <span className="o-subheading">{formatDate(new Date(airDate))}</span>
      </h2>
    )
  }

  return (
    <a className="o-link" href={`/watch/${slugify(title)}`} onClick={props.navigateToWatchListItem}>
      <h2>
        <Icon name="tv" className="u-margin-right--small" />
        {title || name}
        <Icon name="angle-right" className="o-link-icon" />
        <span className="o-subheading">{formatDate(new Date(airDate))}</span>
      </h2>
    </a>
  )
}

export default ListItemTitle

/**
 * Define the types for each property.
 * @type {Object}
 */
ListItemTitle.propTypes = {
  airDate: PropTypes.string,
  episodeNumber: PropTypes.number,
  id: PropTypes.string,
  name: PropTypes.string,
  navigateToWatchListItem: PropTypes.func,
  seasonNumber: PropTypes.number,
  title: PropTypes.string,
  type: PropTypes.string,
  watchlistItem: PropTypes.object,
}

/**
 * Define the default values for each property.
 * @type {Object}
 */
ListItemTitle.defaultProps = {
  airDate: '',
  episodeNumber: 1,
  id: '',
  name: '',
  navigateToWatchListItem: () => {},
  seasonNumber: 1,
  title: '',
  type: '',
  watchlistItem: {
    id: '',
    title: '',
  },
}
