// Dependencies
import React from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import mutation from '../../mutations/addToWatchlist'
import query from '../../queries/getWatchlistItems'

// App components
import history from '../../history'
import Icon from '../Icon'

/**
 * The ListItem component, a stateless component that renders all the details
 * provided for a given list item.
 */
export const ListItem = (props) => {
  const {
    tmdbID,
    title,
    description,
    language,
    image,
    type,
    airDate,
  } = props.item

  const addItem = (event) => {
    event.preventDefault()
    props.toggleLoading()

    props.mutate({
      variables: {
        tmdbID,
        type,
      },
      refetchQueries: [{
        query,
      }],
    }).then(() => {
      props.history.push('/')
    })
  }

  const renderAddToWatchListButton = () => {
    if (!tmdbID) {
      return ''
    }
    return (
      <button className="o-button" onClick={addItem}>
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

export default graphql(mutation)(ListItem)

/**
 * Define the types for each property.
 * @type {Object}
 */
ListItem.propTypes = {
  history: PropTypes.object,
  item: PropTypes.object,
  mutate: PropTypes.func,
  toggleLoading: PropTypes.func,
}

/**
 * Define the default values for each property.
 * @type {Object}
 */
ListItem.defaultProps = {
  history,
  item: {},
  mutate: () => {},
  toggleLoading: () => {},
}
