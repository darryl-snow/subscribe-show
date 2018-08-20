// Dependencies
import React from 'react'
import PropTypes from 'prop-types'

// App components
import Icon from '../../Icon/Icon'

/**
 * Render a button for toggling whether an item has been watched or not.
 */
const ToggleWatched = ({ id, toggleWatched, type, watched }) => {
  // If no ID then it's not on the watchlist,
  // so can't toggle it as watched or not.
  if (!id) {
    return ''
  }

  // Can only toggle movies or individual episodes as watched
  // or not. The button is never disabled.
  if (type === 'Movie' || type === 'Episode') {
    return (
      <button
        className="o-button c-toggle-watched-button"
        onClick={toggleWatched}
        title={watched ? 'Mark as unwatched' : 'Mark as watched'}
      >
        <Icon name={watched ? 'check' : 'eye'} className="u-margin-right--small" />
        {watched ? 'Mark as not watched' : 'Mark as watched'}
      </button>
    )
  }

  // For TV Shows each episode needs to be toggled, so the button should be
  // disabled.
  return (
    <button
      className="o-button o-button--disabled c-toggle-watched-button"
      disabled
      title="Tap the title of the TV Show to mark episodes as watched/unwatched"
    >
      <Icon name={watched ? 'check' : 'eye'} className="u-margin-right--small" />
      {watched ? 'Mark as not watched' : 'Mark as watched'}
    </button>
  )
}

export default ToggleWatched

/**
 * Define the types for each property.
 * @type {Object}
 */
ToggleWatched.propTypes = {
  id: PropTypes.string,
  toggleWatched: PropTypes.func,
  type: PropTypes.string,
  watched: PropTypes.bool,
}

/**
 * Define the default values for each property.
 * @type {Object}
 */
ToggleWatched.defaultProps = {
  id: '',
  toggleWatched: () => {},
  type: '',
  watched: false,
}
