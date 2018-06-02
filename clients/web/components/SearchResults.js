// Dependencies
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import query from '../queries/search'

// App Components
import List from './List/List'
import ListHeader from './List/ListHeader'
import Loader from './Loader'

/**
 * The SearchResults component. Displays a controlled list of search results.
 * @extends Component
 */
class SearchResults extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filters: [],
      listItems: [],
      results: [],
      sortBy: 'airDate',
      sortOrder: 1,
    }
  }
  /**
   * Update the state when the props are updated.
   * @param  {Object}   nextProps The new props.
   */
  componentWillReceiveProps(nextProps) {
    const { data } = nextProps
    this.setState({
      listItems: data.search,
      results: data.search,
    }, this.sortList)
  }
  /**
   * Update the set of list items based on the sort field.
   */
  sortList() {
    const dynamicSort = property => (a, b) => {
      const c = (a[property] > b[property]) ? 1 : 0
      const d = (a[property] < b[property]) ? -1 : c
      return d * this.state.sortOrder
    }
    const tmp = this.state.listItems.slice()
    this.setState({ listItems: tmp.sort(dynamicSort(this.state.sortBy)) })
  }
  /**
   * Update the set of list items based on the filters.
   */
  filterList() {
    this.setState({
      listItems: this.state.results.filter(result =>
        this.state.filters.includes(result.type) && this.state.filters.includes(result.language)),
    })
  }
  /**
   * Callback functions for sub-components. This function is called when the
   * list should be sorted or filtered. It takes arguments from those
   * subcomponents and determines how the list should be updated.
   * @param  {Object}   args The arguments passed from the subcomponent
   */
  updateList = (args) => {
    if (args.filters) {
      this.setState({ filters: args.filters }, this.filterList)
    }
    if (args.sortBy) {
      this.setState({ sortBy: args.sortBy }, this.sortList)
    }
    if (args.sortOrder) {
      this.setState({ sortOrder: args.sortOrder }, this.sortList)
    }
  }
  render() {
    const {
      listItems,
      results,
      sortBy,
      sortOrder,
    } = this.state

    // Get the search query term from the URL.
    const searchQuery = this.props.location.state.query

    // If the API request is in progress, render a loading spinner.
    if (this.props.data.loading) { return <Loader /> }

    // Otherwise render the list.
    return (
      <div className="c-search-results o-container">
        <h1>Search results for {searchQuery}</h1>
        <ListHeader
          className="c-search-results-header"
          content={`Displaying ${listItems.length} results`}
          defaultSort={sortBy}
          results={results}
          sortOrder={sortOrder}
          updateList={this.updateList}
        />
        <List
          className="c-search-results-list"
          listItems={listItems}
        />
      </div>
    )
  }
}

// Append results of the graphQL query to the component properties.
export default graphql(query, {
  options: (props) => {
    const searchQuery = props.location.state.query
    return { variables: { title: searchQuery } }
  },
})(SearchResults)

/**
 * Define the property types.
 * @type {Object}
 */
SearchResults.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
}

/**
 * Define default values for each property.
 * @type {Object}
 */
SearchResults.defaultProps = {
  data: {
    loading: true,
    search: [],
  },
  location: {},
}
