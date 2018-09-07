// Dependencies
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'

// Styles
import './ListSorter.css'

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
      sortOrder: props.sortOrder,
    }
  }
  /**
   * Change the sort field: airDate or title.
   * @param  {Object} event  The event triggered by the selection change.
   */
  changeSortBy = (event) => {
    const sortBy = event.target.value

    // Log the event.
    ReactGA.event({
      category: 'Sort',
      action: `Sort by ${sortBy}`,
    })

    this.setState({
      sortBy,
    })

    this.props.updateList({ sortBy })
  }
  /**
   * Change the sort order. By default the sort order is ascending (1). This
   * function simply toggles the sort order by multiplying the sort order by -1.
   * @param  {Object}   event The event triggered by the button click.
   */
  changeSortOrder = (event) => {
    event.preventDefault()

    const sortOrder = this.state.sortOrder * -1

    // Log the event.
    ReactGA.event({
      category: 'Sort',
      action: `Sort order: ${sortOrder}`,
    })

    this.setState({
      sortOrder,
    })

    this.props.updateList({ sortOrder })
  }
  renderSortOrder() {
    if (this.state.sortBy === 'airDate') {
      return (
        <select
          className="o-button o-button--white o-button--no-border"
          defaultValue="ascending"
          onChange={this.changeSortOrder}
        >
          <option value="ascending">Newest to oldest</option>
          <option value="descending">Oldest to Newest</option>
        </select>
      )
    }
    return (
      <select
        className="o-button o-button--white o-button--no-border"
        defaultValue="ascending"
        onChange={this.changeSortOrder}
      >
        <option value="ascending">A - Z</option>
        <option value="descending">Z - A</option>
      </select>
    )
  }
  render() {
    return (
      <div className="c-list-sorter">
        <select
          className="o-button o-button--white o-button--no-border"
          defaultValue={this.state.sortBy}
          onChange={this.changeSortBy}
        >
          <option value="" disabled>Sort by&hellip;</option>
          <option value="airDate">Release Date</option>
          <option value="title">Title</option>
        </select>
        {this.renderSortOrder()}
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
