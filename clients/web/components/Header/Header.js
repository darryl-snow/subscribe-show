// Dependencies
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

// App Components
import history from '../../history'
import Icon from '../Icon/Icon'

/**
 * The header component.
 */
export default class Header extends Component {
  /**
   * Set the initial state.
   * @param {Object} props Properties passed down to this component
   */
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
    // history.push(`/search/${this.state.query}`, { query: this.state.query })
    this.props.history.push(`/search/${this.state.query}`, { query: this.state.query })
  }
  /**
   * Render the component.
   * @return {Object} The rendered component.
   */
  render() {
    return (
      <div className="c-header u-align--center">
        <NavLink
          activeClassName="c-header-link--is-active"
          className="c-header-link"
          title="My unwatched items"
          to="/"
        >
          <Icon name="home" />
        </NavLink>
        <NavLink
          activeClassName="c-header-link--is-active"
          className="c-header-link"
          title="My watchlist"
          to="/watch"
        >
          <Icon name="list-ul" />
        </NavLink>
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
      </div>
    )
  }
}

/**
 * Define the types for each property.
 * @type {Object}
 */
Header.propTypes = {
  history: PropTypes.object,
  query: PropTypes.string,
}

/**
 * Define the default values for each property.
 * @type {Object}
 */
Header.defaultProps = {
  history,
  query: '',
}
