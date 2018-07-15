// Dependencies
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDate, formatSeasonEpisodeNumbers } from '../../helpers'

// App components
import history from '../../history'
import Icon from '../Icon/Icon'

const slugify = title => title.toLowerCase().replace(/\s/g, '-')

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
   * The item can only be added to the watchlist if it is not there already.
   * This function renders a button that is enabled or disabled depending on
   * the state of the item. These buttons should only appear in the search
   * results list.
   * @return {Object} The rendered button.
   */
  renderAddToWatchListButton = () => {
    const { isInWatchList } = this.props.item

    // Only search results have the isInWatchList property. If the item does
    // not have that property then we can assume that it's already in the
    // watchlist and so we don't need to render the button.
    if (typeof (isInWatchList) === 'undefined') {
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
      <button className="o-button c-add-to-watchlist-button" onClick={this.addItem}>
        <Icon name="plus" className="u-margin-right--small" />
        Add to watchlist
      </button>
    )
  }

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
   * If the item is not in the search results then it's in the watchlist so it
   * can be removed. This function renders a button for calling the removeItem
   * function.
   */
  renderRemoveFromWatchListButton = () => {
    const {
      isInWatchList,
      type,
    } = this.props.item

    // Only search results have the isInWatchList property. If the item has
    // that property then we can assume that it's not in the watchlist and so
    // we don't need to render the button.
    if (typeof (isInWatchList) !== 'undefined') {
      return ''
    }

    // Individual TV Show episodes can't be removed from the watch list.
    if (type === 'Episode') {
      return ''
    }

    return (
      <button className="o-button c-remove-from-watchlist-button u-margin-right--small" onClick={this.removeItem}>
        <Icon name="trash" className="u-margin-right--small" />
        Remove from Watchlist
      </button>
    )
  }

  /**
   * If the item is a search result (and has a tmdbID property) or a movie, then
   * the item title should be displayed. If it's a TV item from the watchlist
   * then the title should be wrapped in a link to the watchlist Item screen.
   * @return {[type]} [description]
   */
  renderTitle = () => {
    const {
      airDate,
      episodeNumber,
      id,
      name,
      seasonNumber,
      title,
      type,
      watchlistItem,
    } = this.props.item

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
          <a className="o-link u-display--block" href={`/watch/${slugify(watchlistItem.title)}`} onClick={this.navigateToWatchListItem}>
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
      <a className="o-link" href={`/watch/${slugify(title)}`} onClick={this.navigateToWatchListItem}>
        <h2>
          <Icon name="tv" className="u-margin-right--small" />
          {title || name}
          <Icon name="angle-right" className="o-link-icon" />
          <span className="o-subheading">{formatDate(new Date(airDate))}</span>
        </h2>
      </a>
    )
  }

  /**
   * Render a button for toggling whether an item has been watched or not.
   * @return {Object} The rendered button.
   */
  renderToggleWatchedButton = () => {
    const { type } = this.props.item
    const { watched } = this.state

    // If no ID then it's not on the watchlist,
    // so can't toggle it as watched or not.
    if (!this.props.item.id) {
      return ''
    }

    // Can only toggle movies or individual episodes as watched
    // or not. The button is never disabled.
    if (type === 'Movie' || type === 'Episode') {
      return (
        <button
          className="o-button c-toggle-watched-button"
          onClick={this.toggleWatched}
          title={watched ? 'Mark as unwatched' : 'Mark as watched'}
        >
          <Icon name={watched ? 'check' : 'eye'} className="u-margin-right--small" />
          {watched ? 'Mark as not watched' : 'Mark was watched'}
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
        {watched ? 'Mark as not watched' : 'Mark was watched'}
      </button>
    )
  }

  /**
   * Render the component.
   * @return {Object} The rendered component.
   */
  render() {
    const {
      description,
      image,
    } = this.props.item
    return (
      <div className="c-list-item">
        <div className="c-list-item-image" style={{ backgroundImage: `url(${image})` }}>
          { !image ? <Icon name="film" /> : '' }
        </div>
        <div className="c-list-item-details">
          {this.renderTitle()}
          {this.renderLanguageLabel()}
          <p>{description}</p>
          {this.renderAddToWatchListButton()}
          {this.renderRemoveFromWatchListButton()}
          {this.renderToggleWatchedButton()}
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
