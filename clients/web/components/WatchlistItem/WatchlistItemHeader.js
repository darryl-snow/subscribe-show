// Dependencies
import React from 'react'
import PropTypes from 'prop-types'

// Styles
import './WatchlistItemHeader.css'

/**
 * The Watchlist Item Detail component.
 */
const WatchlistItemHeader = (props) => {
  const style = {
    backgroundImage: `url(${props.image})`,
  }
  return (
    <header className="c-watchlistitem-header" style={style}>
      <div className="c-watchlistitem-header-content">
        <div className="c-watchlistitem-header-info">
          <h1>{props.title}</h1>
          <p>{props.description}</p>
        </div>
        <aside className="c-watchlistitem-header-meta">
          <span className="o-label u-margin-left--small">{props.language}</span>
        </aside>
      </div>
    </header>
  )
}

export default WatchlistItemHeader

/**
 * Define the property types.
 * @type {Object}
 */
WatchlistItemHeader.propTypes = {
  description: PropTypes.string,
  image: PropTypes.string,
  language: PropTypes.string,
  title: PropTypes.string,
}

/**
 * Set the default values for each property.
 * @type {Object}
 */
WatchlistItemHeader.defaultProps = {
  description: '',
  image: '',
  language: '',
  title: '',
}
