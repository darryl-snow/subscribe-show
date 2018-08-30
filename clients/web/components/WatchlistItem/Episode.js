// Dependencies
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import ToggleWatchedMutation from '../../mutations/toggleEpisodeWatched'
import watchlistQuery from '../../queries/getWatchlistItems'
import unwatchedItemsQuery from '../../queries/getUnwatchedItems'
import { formatDate } from '../../helpers'

// App components
import Icon from '../Icon/Icon'

/**
 * The Episode component renders all details for a given TV episode.
 * @extends Component
 */
export class Episode extends Component {
  constructor(props) {
    super(props)

    this.state = {
      watched: props.watched,
    }
  }
  /**
   * Update the component state and call the mutation to update the episode status.
   * @param  {Event} event The click event that called this function.
   */
  toggleWatched = (event) => {
    event.preventDefault()
    this.setState({
      watched: !this.state.watched,
    })
    this.props.mutate({
      variables: {
        id: this.props.id,
      },
      refetchQueries: [{
        watchlistQuery, // Update the main watchlist items query afterwards.
        unwatchedItemsQuery, // Update the list of unwatched items afterwards.
      }],
    })
  }
  /**
   * Render a button that indicates whether or not the episode has been watched
   * and enables toggling of the watched status.
   * @return {Object} The rendered button.
   */
  renderToggleWatchedButton() {
    const { watched } = this.state
    return (
      <button
        className="o-button c-toggle-watched-button"
        onClick={this.toggleWatched}
        title={watched ? 'Mark as unwatched' : 'Mark as watched'}
      >
        <Icon name={watched ? 'times' : 'check'} className="u-margin-right--small" />
        {watched ? 'Mark as not watched' : 'Mark as watched'}
      </button>
    )
  }
  /**
   * Render the component.
   * @return {Object} The rendered component.
   */
  render() {
    const {
      episodeNumber,
      image,
      name,
      airDate,
      description,
    } = this.props

    return (
      <li className="o-panel c-list-item" key={episodeNumber}>
        <div className="c-list-item-episode-number">{episodeNumber}</div>
        <div className="c-list-item-image-container">
          <div className="c-list-item-image" style={{ backgroundImage: `url(${image})` }}>
            { !image ? <Icon name="film" /> : '' }
          </div>
        </div>
        <div className="c-list-item-details">
          <h3>{name}</h3>
          <span className="o-label">{formatDate(new Date(airDate))}</span>
          <p>{description}</p>
          {this.renderToggleWatchedButton()}
        </div>
      </li>
    )
  }
}

// Compose both the toggleWatched mutation onto the component props.
export default graphql(ToggleWatchedMutation)(Episode)

/**
 * Define the property types.
 * @type {Object}
 */
Episode.propTypes = {
  airDate: PropTypes.string,
  description: PropTypes.string,
  episodeNumber: PropTypes.number,
  id: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  mutate: PropTypes.func,
  watched: PropTypes.bool,
}

/**
 * Set the default values for each property.
 * @type {Object}
 */
Episode.defaultProps = {
  airDate: '',
  description: '',
  episodeNumber: 0,
  id: '',
  image: '',
  name: '',
  mutate: () => {},
  watched: false,
}
