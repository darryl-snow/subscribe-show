// Dependencies
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'

// App components
import Icon from '../../Icon/Icon'

class ToggleWatched extends Component {
  constructor(props) {
    super(props)

    this.state = ({
      watched: props.watched,
    })
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
      id,
      toggleEpisodeWatched,
      toggleItemWatched,
      type,
    } = this.props

    // Log the event.
    this.props.analytics.event({
      category: 'List Item',
      action: 'Toggle Watched',
      label: !this.state.watched,
    })

    this.setState({
      watched: !this.state.watched,
    })

    if (type.toLowerCase() === 'episode') {
      toggleEpisodeWatched(id)
    } else {
      toggleItemWatched(id)
    }
  }

  render() {
    const {
      id,
      type,
    } = this.props

    const { watched } = this.state

    // If no ID then it's not on the watchlist,
    // so can't toggle it as watched or not.
    if (!id) {
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
          <Icon name={watched ? 'times' : 'check'} className="u-margin-right--small" />
          {watched ? 'Mark as not watched' : 'Mark as watched'}
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
        <Icon name={watched ? 'times' : 'check'} className="u-margin-right--small" />
        {watched ? 'Mark as not watched' : 'Mark as watched'}
      </button>
    )
  }
}

export default ToggleWatched

/**
 * Define the types for each property.
 * @type {Object}
 */
ToggleWatched.propTypes = {
  analytics: PropTypes.object,
  id: PropTypes.string,
  toggleEpisodeWatched: PropTypes.func,
  toggleItemWatched: PropTypes.func,
  type: PropTypes.string,
  watched: PropTypes.bool,
}

/**
 * Define the default values for each property.
 * @type {Object}
 */
ToggleWatched.defaultProps = {
  analytics: ReactGA,
  id: '',
  toggleEpisodeWatched: () => {},
  toggleItemWatched: () => {},
  type: '',
  watched: false,
}
