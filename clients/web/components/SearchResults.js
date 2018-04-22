import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import query from '../queries/search';

import history from '../history';

class SearchResults extends Component {
  getResultsList(results) {
    return results.map(result => {
      return (
        <li key={result.tmdbID}>{result.title}</li>
      );
    });
  }
  /**
   * Render the component
   * @return {[type]} [description]
   */
  render() {
    console.log(this.props);
    const query = this.props.location.state.query;
    if (this.props.data.loading) { return <div>Loading...</div>; }
    return (
      <div className="o-container">
        <h1>Search Results for {query}</h1>
        <ul>
          {this.getResultsList(this.props.data.search)}
        </ul>
      </div>
    );
  }
}

export default graphql(query, {
  options: (props) => {
    const query = props.location.state.query;
    return { variables: { title: query } }
  }
})(SearchResults);
