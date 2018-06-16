// Dependencies
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// App Components
import List from './List/List'
import ListHeader from './List/ListHeader'
import Loader from './Loader'

/**
 * The ListContainer component. Receives a set of list items and renders a
 * fully controlled list with filters and sort options.
 * @extends Component
 */
class ListContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filters: [],
      displayListItems: [],
      loading: props.data.loading,
      receivedListItems: props.data[props.query],
      sortBy: props.sortBy,
      sortOrder: props.sortOrder,
    }
  }
  /**
   * Update the state when the props are updated.
   * @param  {Object}   nextProps The new props.
   */
  componentWillReceiveProps(nextProps) {
    const { data, query } = nextProps
    this.setState({
      displayListItems: data[query],
      receivedListItems: data[query],
      loading: data.loading,
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
    const tmp = this.state.displayListItems.slice()
    this.setState({ displayListItems: tmp.sort(dynamicSort(this.state.sortBy)) })
  }
  /**
   * Update the set of list items based on the filters.
   */
  filterList() {
    this.setState({
      displayListItems: this.state.receivedListItems.filter(listItem =>
        this.state.filters.includes(listItem.type.toLowerCase()) &&
          this.state.filters.includes(listItem.language.toLowerCase())),
    })
  }
  /**
   * Toggle the loading state. This is a hack to enable list item sub-components
   * to be able to change the loading state. TODO: use react context.
   */
  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading,
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
  renderTitle = () => {
    const { title } = this.props
    if (!title) {
      return ''
    }
    return (
      <h1>{title}</h1>
    )
  }
  render() {
    const {
      displayListItems,
      loading,
      receivedListItems,
      sortBy,
      sortOrder,
    } = this.state

    const { className } = this.props
    const { length } = displayListItems
    const content = length === 1 ? `Displaying ${length} result` : `Displaying ${length} results`

    // If the API request is in progress, render a loading spinner.
    if (loading) { return <Loader /> }

    // Otherwise render the list.
    return (
      <div className={`${className} o-container`}>
        {this.renderTitle()}
        <ListHeader
          className={`${className}-header`}
          content={content}
          defaultSort={sortBy}
          results={receivedListItems}
          sortOrder={sortOrder}
          updateList={this.updateList}
        />
        <List
          className={`${className}-list`}
          listItems={displayListItems}
          toggleLoading={this.toggleLoading}
        />
      </div>
    )
  }
}

export default ListContainer

/**
 * Define the property types.
 * @type {Object}
 */
ListContainer.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
  query: PropTypes.string,
  sortBy: PropTypes.string,
  sortOrder: PropTypes.number,
  title: PropTypes.string,
}

/**
 * Define default values for each property.
 * @type {Object}
 */
ListContainer.defaultProps = {
  className: '',
  data: {
    loading: true,
    search: [],
  },
  query: '',
  sortBy: 'airDate',
  sortOrder: 1,
  title: '',
}
