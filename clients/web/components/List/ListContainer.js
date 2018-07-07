// Dependencies
import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import PropTypes from 'prop-types'

// App Components
import EmptyList from '../EmptyList/EmptyList'
import history from '../../history'
import List from './List'
import ListHeader from './ListHeader'
import Loader from '../Loader/Loader'
import Modal from '../Modal/Modal'

// Mutations
import AddItemMutation from '../../mutations/addToWatchlist'
import RemoveItemMutation from '../../mutations/removeFromWatchlist'
import ToggleWatchedMutation from '../../mutations/toggleItemWatched'

// Queries
import query from '../../queries/getWatchlistItems'

/**
 * The ListContainer component. Receives a set of list items and renders a
 * fully controlled list with filters and sort options.
 * @extends Component
 */
export class ListContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filters: [],
      displayListItems: props.data[props.query] || [],
      itemToBeRemoved: 0,
      loading: props.data.loading,
      receivedListItems: props.data[props.query],
      showModal: false,
      sortBy: props.sortBy,
      sortOrder: props.sortOrder,
    }
  }

  /**
   * Update the state when the props are updated.
   * @param  {Object}   nextProps The new props.
   */
  componentWillReceiveProps(nextProps) {
    const { data } = nextProps
    this.setState({
      displayListItems: data[nextProps.query],
      receivedListItems: data[nextProps.query],
      loading: data.loading,
    }, this.sortList)
  }

  // ------------CUSTOM METHODS------------

  /**
   * Add an item to the list.
   * @param {String} tmdbID The ID of the item in the 3rd party API.
   * @param {String} type   Movie or TV Show.
   */
  addItem = (tmdbID, type) => {
    this.setState({
      loading: true,
    })

    this.props.addItem({
      variables: {
        tmdbID,
        type,
      },
      refetchQueries: [{
        query, // Update the main watchlist items query afterwards.
      }],
    }).then(() => {
      this.props.history.push('/watch') // Go to the watchlist after adding an item.
    })
  }

  /**
   * This function closes the Modal component by updating the state.
   */
  closeModal = () => {
    this.setState({
      showModal: false,
    })
  }

  /**
   * This function is called from within the modal when the user taps the
   * Confirm button to remove an item. The function also calls the mutation
   * to remove the item saved in the state, then updates the list.
   */
  confirmModal = () => {
    this.setState({
      loading: true,
      showModal: false,
    })

    this.props.removeItem({
      variables: { id: this.state.itemToBeRemoved },
      refetchQueries: [{
        query, // Update the main watchlist items query afterwards.
      }],
    }).then(() => {
      // After the mutation is complete, then run the query to update the
      // watchlist items.
      // TODO: find a better way to handle this race condition
      setTimeout(() => {
        this.props.data.refetch()
        this.setState({
          loading: false,
        })
      }, 1000)
    })
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
   * The user must confirm before a list item can be removed. This function
   * opens the modal by updating the state, and also saves in the state the
   * item to be removed.
   * @param  {String} id The ID of the item to be removed.
   */
  removeItem = (id) => {
    this.setState({
      itemToBeRemoved: id,
      showModal: true,
    })
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
   * Toggle an item as watched or unwatched by calling the mutation.
   * @param  {String} id The ID of the item to be toggled.
   */
  toggleWatched = (id) => {
    this.props.toggleWatched({
      variables: { id },
      refetchQueries: [{
        query, // Update the main watchlist items query afterwards.
      }],
    })
  }

  /**
   * Callback functions for sub-components. This function is called when the
   * list should be sorted or filtered. It takes arguments from those
   * subcomponents and determines how the list should be updated.
   * @param  {Object}   args The arguments passed from the subcomponent.
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

  // ------------RENDER METHODS------------

  /**
   * Render a title only if one has been provided.
   * @return {Object} The rendered title.
   */
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

    // If there are no search results, display the EmptyList component
    if (!length && this.props.query === 'search') { return <EmptyList message="Try searching for something else." /> }

    // If there are no watchlist items, display the EmptyList component
    if (!length) { return <EmptyList message="Try searching for something to watch." /> }

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
          addItem={this.addItem}
          className={`${className}-list`}
          listItems={displayListItems}
          removeItem={this.removeItem}
          toggleWatched={this.toggleWatched}
        />
        <Modal
          close={this.closeModal}
          confirm={this.confirmModal}
          isShown={this.state.showModal}
          type="confirm"
          icon="question-circle"
        >
          Are you sure you want to remove this item?
        </Modal>
      </div>
    )
  }
}

// Compose both the mutations onto the component props.
export default compose(
  graphql(AddItemMutation, {
    name: 'addItem',
  }),
  graphql(RemoveItemMutation, {
    name: 'removeItem',
  }),
  graphql(ToggleWatchedMutation, {
    name: 'toggleWatched',
  }),
)(ListContainer)

/**
 * Define the property types.
 * @type {Object}
 */
ListContainer.propTypes = {
  addItem: PropTypes.func,
  className: PropTypes.string,
  data: PropTypes.object,
  history: PropTypes.object,
  query: PropTypes.string,
  removeItem: PropTypes.func,
  sortBy: PropTypes.string,
  sortOrder: PropTypes.number,
  title: PropTypes.string,
  toggleWatched: PropTypes.func,
}

/**
 * Define default values for each property.
 * @type {Object}
 */
ListContainer.defaultProps = {
  addItem: () => {},
  className: '',
  data: {
    loading: true,
    search: [],
  },
  history,
  query: '',
  removeItem: () => {},
  sortBy: 'airDate',
  sortOrder: 1,
  title: '',
  toggleWatched: () => {},
}
