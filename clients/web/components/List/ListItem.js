// Dependencies
import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import AddItemMutation from '../../mutations/addToWatchlist'
import ToggleWatchedMutation from '../../mutations/toggleWatched'
import query from '../../queries/getWatchlistItems'

// App components
import history from '../../history'
import Icon from '../Icon/Icon'

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
   * The item can only be added to the watchlist if it is not there already.
   * This function renders a button that is enabled or disabled depending on
   * the state of the item. These buttons should only appear in the search
   * results list.
   * @return {Object} The rendered button.
   */
  renderAddToWatchListButton = () => {
    // If the item has a tmdbID property then it's not a search result but a
    // watchlist item.
    if (!this.props.item.tmdbID) {
      return ''
    }

    const { isInWatchList } = this.props.item

    if (isInWatchList) {
      return (
        <button className="o-button o-button--disabled">
          <Icon name="check" className="u-margin-right--small" />
          Already added
        </button>
      )
    }

    return (
      <button className="o-button" onClick={this.addItem}>
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
   * If the item is a search result (and has a tmdbID property) or a movie, then
   * the item title should be displayed. If it's a TV item from the watchlist
   * then the title should be wrapped in a link to the watchlist Item screen.
   * @return {[type]} [description]
   */
  renderTitle = () => {
    const {
      id,
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
      <a className="o-link" href={`/watch/${id}`}>
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

    // Can only toggle movies as watched or not.
    if (type === 'Movie') {
      return (
        <button
          className={watched ?
            'c-toggle-watched-button c-toggle-watched-button--watched' :
            'c-toggle-watched-button'}
          onClick={this.toggleWatched}
          title={watched ? 'Mark as unwatched' : 'Mark as watched'}
        >
          <Icon name={watched ? 'eye' : 'eye-slash'} />
        </button>
      )
    }

    // For TV Shows each episode needs to be toggled.
    return (
      <span
        className={watched ?
          'c-toggle-watched-button c-toggle-watched-button--disabled c-toggle-watched-button--watched' :
          'c-toggle-watched-button c-toggle-watched-button--disabled'}
      >
        <Icon name={watched ? 'eye' : 'eye-slash'} />
      </span>
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
          {this.renderToggleWatchedButton()}
        </div>
      </div>
    )
  }
}

// Compose both the toggleWatched and the addItem mutations onto the
// component props.
export default compose(
  graphql(ToggleWatchedMutation, {
    name: 'toggleWatched',
  }),
  graphql(AddItemMutation, {
    name: 'addItem',
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
  toggleLoading: () => {},
  toggleWatched: () => {},
}
