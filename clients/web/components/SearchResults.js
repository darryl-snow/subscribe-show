// Dependencies
import React from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'

// Queries
import query from '../queries/search'

/**
 * The SearchResults component is a higher-order component that simply passes
 * data into a ListContainer component.
 */
export default (PassedComponent) => {
  const SearchResults = (props) => {
    const title = `Search results for '${props.data.variables.title}'`
    ReactGA.pageview('Search Results')
    return (
      <PassedComponent
        className="c-search-results"
        sortBy="airDate"
        sortOrder={1}
        query="search"
        title={title}
        {...props}
      />
    )
  }

  /**
   * Define the property types.
   * @type {Object}
   */
  SearchResults.propTypes = {
    data: PropTypes.object,
  }

  /**
   * Define default values for each property.
   * @type {Object}
   */
  SearchResults.defaultProps = {
    data: {
      variables: {
        title: '',
      },
    },
  }

  // Append results of the graphQL query to the component properties.
  return graphql(query, {
    options: (props) => {
      const searchQuery = props.location.state.query
      return {
        fetchPolicy: 'network-only',
        variables: { title: searchQuery },
      }
    },
  })(SearchResults)
}
