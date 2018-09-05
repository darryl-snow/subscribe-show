// Dependencies
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'

// App components
import history from '../../history'
import Icon from '../Icon/Icon'

// Styles
import './SearchForm.css'

class SearchForm extends Component {
  constructor(props) {
    super(props)

    let query = props.query || ''

    // Get the search query either from the URL or from the props.
    if (!query) {
      query = props.history.location.state ?
        props.history.location.state.query : ''
    }

    this.state = { query }
  }
  /**
   * This checks for updated props, such as a change in the history.location
   * object. When the route changes, we should check if we should also clear
   * the search query, e.g. when navigating to the search results to the home
   * page.
   * @param  {Object} nextProps The to be updated props object.
   */
  componentWillReceiveProps(nextProps) {
    const { location } = nextProps.history

    // If the new path is not the search results page, then clear the query
    // from the header.
    if (location.pathname.indexOf('search') === -1 && location.search === '') {
      this.setState({
        query: nextProps.query,
      })
    }
  }
  /**
   * Submit the search form.
   * @param  {Object} event The event that fired the form submission
   */
  onSubmit = (event) => {
    event.preventDefault()

    const { query } = this.state

    // Log the event.
    ReactGA.event({
      category: 'Search Form',
      action: 'Search',
      label: query,
    })

    this.props.history.push(`/search/${query}`, { query })
  }
  render() {
    return (
      <form className="c-search-form" onSubmit={this.onSubmit}>
        <input
          className="c-search-form-input"
          type="text"
          placeholder="Search for things to watch"
          value={this.state.query}
          onChange={event => this.setState({ query: event.target.value })}
        />
        <button className="c-search-form-button">
          <Icon name="search" />
        </button>
      </form>
    )
  }
}

export default SearchForm

/**
 * Define the types for each property.
 * @type {Object}
 */
SearchForm.propTypes = {
  history: PropTypes.object,
  query: PropTypes.string,
}

/**
 * Define the default values for each property.
 * @type {Object}
 */
SearchForm.defaultProps = {
  history,
  query: '',
}
