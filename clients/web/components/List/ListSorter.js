// Dependencies
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon'

/**
 * The ListSorter component. This provides controls for sorting a list by
 * airDate or by title.
 * @type {Object}
 */
export default class ListSorter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sortBy: props.sortBy,
    }
  }
  /**
   * Change the sort field: airDate or title.
   * @param  {Object} event  The event triggered by the selection change.
   * @return {Boolean}       Dummy return value.
   */
  changeSortBy = (event) => {
    const sortBy = event.target.value
    this.props.updateList({ sortBy })
    return true
  }
  /**
   * Change the sort order. By default the sort order is ascending (1). This
   * function simply toggles the sort order by multiplying the sort order by -1.
   * @param  {Object}   event The event triggered by the button click.
   * @return {Boolean}        Dummy return value.
   */
  changeSortOrder = (event) => {
    event.preventDefault()
    this.props.updateList({ sortOrder: this.props.sortOrder * -1 })
    return true
  }
  render() {
    return (
      <div className="c-list-sorter u-flex">
        <select
          className="o-select o-label c-list-sort-order-select u-margin-right--small"
          defaultValue={this.state.sortBy}
          onChange={this.changeSortBy}
        >
          <option value="" disabled>Sort by&hellip;</option>
          <option value="airDate">Release Date</option>
          <option value="title">Title</option>
        </select>
        <button
          className="o-label c-list-sort-order-button"
          onClick={this.changeSortOrder}
        >
          <Icon name="sort" />
        </button>
      </div>
    )
  }
}

/**
 * Define the property types.
 * @type {Object}
 */
ListSorter.propTypes = {
  sortBy: PropTypes.string,
  sortOrder: PropTypes.number,
  updateList: PropTypes.func,
}

/**
 * Define the default property values.
 * @type {Object}
 */
ListSorter.defaultProps = {
  sortBy: 'airDate',
  sortOrder: 1,
  updateList: () => {},
}
