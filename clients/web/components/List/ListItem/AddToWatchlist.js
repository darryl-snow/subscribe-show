// Dependencies
import React from 'react'
import PropTypes from 'prop-types'

// App components
import Icon from '../../Icon/Icon'

/**
 * The item can only be added to the watchlist if it is not there already.
 * This component renders a button that is enabled or disabled depending on
 * the state of the item. This button should only appear in the search
 * results list.
 */
const AddToWatchlist = ({ addItem, isInWatchList }) => {
  // Only search results have the isInWatchList property. If the item does
  // not have that property then we can assume that it's already in the
  // watchlist and so we don't need to render the button.
  if (isInWatchList === undefined) {
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
  addItem: PropTypes.func,
  isInWatchList: PropTypes.bool,
}

/**
 * Define the default values for each property.
 * @type {Object}
 */
AddToWatchlist.defaultProps = {
  addItem: () => {},
  isInWatchList: undefined,
}
