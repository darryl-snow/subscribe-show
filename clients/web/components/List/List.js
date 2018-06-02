// Dependencies
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ListItem from './ListItem'

/**
 * The List component, a collection of list items.
 * @type {Class}
 */
export default class List extends Component {
  /**
   * Map over the items provided as props and render a ListItem component for
   * each.
   * @return {Object} The rendered collection of list items.
   */
  renderListItems() {
    return this.props.listItems.map(item =>
      (
        <li key={item.tmdbID}>
          <ListItem item={item} />
        </li>
      ))
  }
  /**
   * Render the list.
   * @return {Object} The rendered component.
   */
  render() {
    return (
      <div className="c-list">
        <ul className="u-unstyled-list">
          {this.renderListItems()}
        </ul>
      </div>
    )
  }
}

/**
 * Define the property types.
 * @type {Object}
 */
List.propTypes = {
  listItems: PropTypes.array,
}

/**
 * Define the default values for the property types.
 * @type {Object}
 */
List.defaultProps = {
  listItems: [],
}
