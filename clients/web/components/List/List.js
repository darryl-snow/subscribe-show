// Dependencies
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ListItem from './ListItem'

/**
 * The List component, a collection of list items.
 * @type {Class}
 */
class List extends Component {
  /**
   * Map over the items provided as props and render a ListItem component for
   * each.
   * @return {Object} The rendered collection of list items.
   */
  renderListItems() {
    const {
      addItem,
      listItems,
      removeItem,
      toggleWatched,
    } = this.props

    return listItems.map(item =>
      (
        <li key={item.tmdbID || item.id}>
          <ListItem
            addItem={addItem}
            item={item}
            removeItem={removeItem}
            toggleWatched={toggleWatched}
          />
        </li>
      ))
  }
  /**
   * Render the list.
   * @return {Object} The rendered component.
   */
  render() {
    return (
      <div className={`${this.props.className} c-list`}>
        <ul className="u-unstyled-list">
          {this.renderListItems()}
        </ul>
      </div>
    )
  }
}

export default List

/**
 * Define the property types.
 * @type {Object}
 */
List.propTypes = {
  addItem: PropTypes.func,
  className: PropTypes.string,
  listItems: PropTypes.array,
  removeItem: PropTypes.func,
  toggleWatched: PropTypes.func,
}

/**
 * Define the default values for the property types.
 * @type {Object}
 */
List.defaultProps = {
  addItem: () => {},
  className: '',
  listItems: [],
  removeItem: () => {},
  toggleWatched: () => {},
}
