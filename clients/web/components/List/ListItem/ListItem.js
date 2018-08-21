// Dependencies
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { slugify } from '../../../helpers'

// App components
import AddToWatchlist from './AddToWatchlist'
import history from '../../../history'
import Icon from '../../Icon/Icon'
import ListItemTitle from './ListItemTitle'
import RemoveFromWatchlist from './RemoveFromWatchlist'
import ToggleWatched from './ToggleWatched'

/**
 * The ListItem component, a stateless component that renders all the details
 * provided for a given list item.
 */
class ListItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      watched: props.item.watched,
    }
  }

  // ------------CUSTOM METHODS------------

  /**
   * Add an item to the watchlist by passing to the relevant data to the
   * function on the props.
   * @param {Object} event The click event on the add item button.
   */
  addItem = (event) => {
    event.preventDefault()
    const {
      addItem,
      item,
    } = this.props
    addItem(item.tmdbID, item.type)
  }

  /**
   * Use the history object to navigate to the watchlist item.
   * @param  {Event} event The click event that triggered the function call.
   */
  navigateToWatchListItem = (event) => {
    event.preventDefault()
    const title = this.props.item.title || this.props.item.watchlistItem.title
    this.props.history.push(`/watch/${slugify(title)}`)
  }

  /**
   * Remove an item from the watchlist by passing the item ID to
   * the function on the props.
   * @param {Object} event The click event on the add item button.
   */
  removeItem = (event) => {
    event.preventDefault()
    const {
      removeItem,
      item,
    } = this.props
    removeItem(item.id)
  }

  /**
   * Toggle an item as having been watched or not by passing the ID
   * to the function on the props. As the same time, reverse the
   * state on the component.
   * @param  {[type]} event The click event on the toggle watched button.
   */
  toggleWatched = (event) => {
    event.preventDefault()
    const {
      toggleWatched,
      item,
    } = this.props

    this.setState({
      watched: !this.state.watched,
    })

    toggleWatched(item.id)
  }

  // ------------RENDER METHODS------------

  /**
   * Render a label to indicate the item's language.
   * @return {Object} The rendered label.
   */
  renderLanguageLabel = () => {
    const { language } = this.props.item
    if (!language) {
      return ''
    }
    return <span className="o-label">{language}</span>
  }

  /**
   * Render the component.
   * @return {Object} The rendered component.
   */
  render() {
    const {
      description,
      id,
      image,
      isInWatchList,
      type,
    } = this.props.item

    return (
      <div className="c-list-item">
        <div className="c-list-item-image-container">
          <div className="c-list-item-image" style={{ backgroundImage: `url(${image})` }}>
            { !image ? <Icon name="film" /> : '' }
          </div>
        </div>
        <div className="c-list-item-details">

          <ListItemTitle
            {...this.props.item}
            navigateToWatchListItem={this.navigateToWatchListItem}
          />

          {this.renderLanguageLabel()}

          <p>{description}</p>

          <AddToWatchlist
            addItem={this.addItem}
            isInWatchList={isInWatchList}
          />

          <RemoveFromWatchlist
            isInWatchList={isInWatchList}
            removeItem={this.removeItem}
            type={type}
          />

          <ToggleWatched
            id={id}
            toggleWatched={this.toggleWatched}
            type={type}
            watched={this.state.watched}
          />

        </div>
      </div>
    )
  }
}

export default ListItem

/**
 * Define the types for each property.
 * @type {Object}
 */
ListItem.propTypes = {
  addItem: PropTypes.func,
  history: PropTypes.object,
  item: PropTypes.object,
  removeItem: PropTypes.func,
  toggleWatched: PropTypes.func,
}

/**
 * Define the default values for each property.
 * @type {Object}
 */
ListItem.defaultProps = {
  addItem: () => {},
  history,
  item: {},
  removeItem: () => {},
  toggleWatched: () => {},
}
