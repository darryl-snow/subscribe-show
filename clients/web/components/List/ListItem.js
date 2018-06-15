// Dependencies
import React from 'react'
import PropTypes from 'prop-types'

// App components
import Icon from '../Icon'

/**
 * The ListItem component, a stateless component that renders all the details
 * provided for a given list item.
 */
const ListItem = ({ item }) => {
  const {
    tmdbID,
    title,
    description,
    language,
    image,
    type,
    airDate,
  } = item

  const renderAddToWatchListButton = () => {
    if (!tmdbID) {
      return ''
    }
    return (
      <button className="o-button">
        <Icon name="plus" className="u-margin-right--small" />
        Add to watchlist
      </button>
    )
  }

  const renderLanguageLabel = () => {
    if (!language) {
      return ''
    }
    return <span className="o-label">{language}</span>
  }

  return (
    <div className="c-list-item">
      <div className="c-list-item-image" style={{ backgroundImage: `url(${image})` }}>
        { !image ? <Icon name="film" /> : '' }
      </div>
      <div className="c-list-item-details">
        <h2>
          <Icon name={type} className="u-margin-right--small" />
          {title}
          <span className="o-subheading">{airDate}</span>
        </h2>
        {renderLanguageLabel()}
        <p>{description}</p>
        {renderAddToWatchListButton()}
      </div>
    </div>
  )
}

export default ListItem

/**
 * Define the types for each property.
 * @type {Object}
 */
ListItem.propTypes = {
  item: PropTypes.object,
}

/**
 * Define the default values for each property.
 * @type {Object}
 */
ListItem.defaultProps = {
  item: {},
}
