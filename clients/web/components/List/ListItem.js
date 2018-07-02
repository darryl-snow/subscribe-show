// Dependencies
import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import PropTypes from 'prop-types'
// Mutations
import AddItemMutation from '../../mutations/addToWatchlist'
import RemoveItemMutation from '../../mutations/removeFromWatchlist'
import ToggleWatchedMutation from '../../mutations/toggleItemWatched'
// Queries
import query from '../../queries/getWatchlistItems'

// App components
import history from '../../history'
import Icon from '../Icon/Icon'

const slugify = title => title.toLowerCase().replace(/\s/g, '-')

/**
 * The ListItem component, a stateless component that renders all the details
 * provided for a given list item.
 */
export class ListItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      watched: props.item.watched,
    }
  }

  /**
   * Add an item to the watchlist by calling the addItem mutation.
   * @param {Object} event The click event on the add item button.
   */
  addItem = (event) => {
    event.preventDefault()
    this.props.toggleLoading()

    this.props.addItem({
      variables: {
        tmdbID: this.props.item.tmdbID,
        type: this.props.item.type,
      },
      refetchQueries: [{
        query, // Update the main watchlist items query afterwards.
      }],
    }).then(() => {
      this.props.history.push('/') // After adding, redirect to the home page.
    })
  }

  /**
   * Remove an item from the watchlist by calling the removeItem mutation.
   * @param {Object} event The click event on the add item button.
   */
  removeItem = (event) => {
    event.preventDefault()
    this.props.toggleLoading()

    this.props.removeItem({
      variables: {
        id: this.props.item.id,
      },
      refetchQueries: [{
        query, // Update the main watchlist items query afterwards.
      }],
    }).then(() => {
      this.props.history.push('/') // After adding, redirect to the home page.
    })
  }

  /**
   * Toggle an item as having been watched or not by calling the toggleWatched
   * mutation.
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  toggleWatched = (event) => {
    event.preventDefault()

    this.setState({
      watched: !this.state.watched,
    })

    this.props.toggleWatched({
      variables: {
        id: this.props.item.id,
      },
      refetchQueries: [{
        query, // Update the main watchlist items query afterwards.
      }],
    })
  }

  /**
   * Use the history object to navigate to the watchlist item.
   * @param  {Event} event The click event that triggered the function call.
   */
  navigateToWatchListItem = (event) => {
    event.preventDefault()
    const title = slugify(this.props.item.title)
    this.props.history.push(`/watch/${title}`)
  }

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
   * If the item is not in the search results then it's in the watchlist so it
   * can be removed. This function renders a button for calling the removeItem
   * function.
   */
  renderRemoveFromWatchListButton = () => {
    const { isInWatchList } = this.props.item

    // Only search results have the isInWatchList property. If the item has
    // that property then we can assume that it's not in the watchlist and so
    // we don't need to render the button.
    if (typeof (isInWatchList) !== 'undefined') {
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
   * If the item is a search result (and has a tmdbID property) or a movie, then
   * the item title should be displayed. If it's a TV item from the watchlist
   * then the title should be wrapped in a link to the watchlist Item screen.
   * @return {[type]} [description]
   */
  renderTitle = () => {
    const {
      airDate,
      title,
      tmdbID,
      type,
    } = this.props.item

    if (type === 'Movie' || !tmdbID) {
      return (
        <h2>
          <Icon name={type} className="u-margin-right--small" />
          {title}
          <span className="o-subheading">{airDate}</span>
        </h2>
      )
    }

    return (
      <a className="o-link" href={`/watch/${slugify(title)}`} onClick={this.navigateToWatchListItem}>
        <h2>
          <Icon name={type} className="u-margin-right--small" />
          {title}
          <Icon name="angle-right" className="o-link-icon" />
          <span className="o-subheading">{airDate}</span>
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

    // Can only toggle movies as watched or not. The button is never disabled.
    if (type === 'Movie') {
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

// Compose both the toggleWatched and the addItem mutations onto the
// component props.
export default compose(
  graphql(AddItemMutation, {
    name: 'addItem',
  }),
  graphql(RemoveItemMutation, {
    name: 'removeItem',
  }),
  graphql(ToggleWatchedMutation, {
    name: 'toggleWatched',
  }),
)(ListItem)

/**
 * Define the types for each property.
 * @type {Object}
 */
ListItem.propTypes = {
  addItem: PropTypes.func,
  history: PropTypes.object,
  item: PropTypes.object,
  removeItem: PropTypes.func,
  toggleLoading: PropTypes.func,
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
  toggleLoading: () => {},
  toggleWatched: () => {},
}
