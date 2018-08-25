// Dependencies
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { slugify } from '../../../helpers'

// App components
import AddToWatchlist from './AddToWatchlist'
import Context from '../ListContext'
import Icon from '../../Icon/Icon'
import ListItemTitle from './ListItemTitle'
import RemoveFromWatchlist from './RemoveFromWatchlist'
import ToggleWatched from './ToggleWatched'

// Styles
import './ListItem.css'

/**
 * The ListItem component, a stateless component that renders all the details
 * provided for a given list item.
 */
class ListItem extends Component {
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
      tmdbID,
      type,
      watched,
    } = this.props.item

    return (
      <div className="o-panel c-list-item">
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

          <Context.Consumer>
            {context => (
              <div className="o-button-group">

                <AddToWatchlist
                  add={context.addItem}
                  isInWatchList={isInWatchList}
                  tmdbID={tmdbID}
                  type={type}
                />

                <RemoveFromWatchlist
                  id={id}
                  isInWatchList={isInWatchList}
                  remove={context.removeItem}
                  type={type}
                />

                <ToggleWatched
                  id={id}
                  toggleEpisodeWatched={context.toggleEpisodeWatched}
                  toggleItemWatched={context.toggleItemWatched}
                  type={type}
                  watched={watched}
                />

              </div>
            )}
          </Context.Consumer>

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
  item: PropTypes.object,
}

/**
 * Define the default values for each property.
 * @type {Object}
 */
ListItem.defaultProps = {
  item: {},
}
