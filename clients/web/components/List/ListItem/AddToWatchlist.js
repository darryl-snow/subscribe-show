// Dependencies
import React from 'react'
import PropTypes from 'prop-types'

// App components
import History from '../../../history'
import Icon from '../../Icon/Icon'

/**
 * The item can only be added to the watchlist if it is not there already.
 * This component renders a button that is enabled or disabled depending on
 * the state of the item. This button should only appear in the search
 * results list.
 */
const AddToWatchlist = ({
  add,
  history,
  isInWatchList,
  tmdbID,
  type,
}) => {
  // Only display this button for searchlist results
  if (!history.location.pathname.includes('search')) {
    return ''
  }

  if (isInWatchList) {
    return (
      <button className="o-button o-button--disabled c-add-to-watchlist-button">
        <Icon name="check" className="u-margin-right--small" />
        Already added
      </button>
    )
  }

  const addItem = (event) => {
    event.preventDefault()
    add(tmdbID, type)
  }

  return (
    <button className="o-button c-add-to-watchlist-button" onClick={addItem}>
      <Icon name="plus" className="u-margin-right--small" />
      Add to watchlist
    </button>
  )
}

export default AddToWatchlist

/**
 * Define the types for each property.
 * @type {Object}
 */
AddToWatchlist.propTypes = {
  add: PropTypes.func,
  history: PropTypes.object,
  isInWatchList: PropTypes.bool,
  tmdbID: PropTypes.string,
  type: PropTypes.string,
}

/**
 * Define the default values for each property.
 * @type {Object}
 */
AddToWatchlist.defaultProps = {
  add: () => {},
  history: History,
  isInWatchList: undefined,
  tmdbID: '',
  type: '',
}
