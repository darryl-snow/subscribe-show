// Dependencies
import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
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

  addItem = (event) => {
    event.preventDefault()
    this.props.toggleLoading()

    this.props.addItem({
      variables: {
        tmdbID: this.props.item.tmdbID,
        type: this.props.item.type,
      },
      refetchQueries: [{
        query,
      }],
    }).then(() => {
      this.props.history.push('/')
    })
  }

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
        query,
      }],
    })
  }

  renderAddToWatchListButton = () => {
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

  renderLanguageLabel = () => {
    const { language } = this.props.item
    if (!language) {
      return ''
    }
    return <span className="o-label">{language}</span>
  }

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
          className={watched ? 'c-toggle-watched-button c-toggle-watched-button--watched' : 'c-toggle-watched-button'}
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
        className={watched ? 'c-toggle-watched-button c-toggle-watched-button--disabled c-toggle-watched-button--watched' : 'c-toggle-watched-button c-toggle-watched-button--disabled'}
      >
        <Icon name={watched ? 'eye' : 'eye-slash'} />
      </span>
    )
  }

  render() {
    const {
      airDate,
      description,
      image,
      title,
      type,
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
