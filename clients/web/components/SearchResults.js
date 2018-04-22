import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import FontAwesome from 'react-fontawesome';
import query from '../queries/search';
import history from '../history';

/**
 * [SearchResults description]
 * @extends Component
 */
class SearchResults extends Component {
  getLoadingSpinner() {
    return (
      <div class="c-loader"></div>
    );
  }
  /**
   * [getIcon description]
   * @param  {[type]} type [description]
   * @return {[type]}      [description]
   */
  getIcon(type) {
    if (type === "TV") {
      return (
        <FontAwesome name="tv" className="u-margin-right" />
      );
    } else {
      return (
        <FontAwesome name="film" className="u-margin-right" />
      );
    }
  }
  /**
   * [getResultsList description]
   * @param  {[type]} results [description]
   * @return {[type]}         [description]
   */
  getResultsList(results) {
    return results.map(result => {
      return (
        <li key={result.tmdbID}>
          <div className="c-list-item">
            <div className="c-list-item-image" style={{backgroundImage: `url(${result.image})`}} />
            <div className="c-list-item-details">
              <h2>
                {this.getIcon(result.type)}
                {result.title}
              </h2>
              <span className="o-label">{result.language}</span>
              <p>{result.description}</p>
              <button className="c-button">
                <FontAwesome name="plus" className="u-margin-right" />
                Add to watchlist
              </button>
            </div>
          </div>
        </li>
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
    if (this.props.data.loading) { return this.getLoadingSpinner(); }
    return (
      <div className="o-container">
        <h1>Search Results for {query}</h1>
        <ul className="u-unstyled-list">
          {this.getResultsList(this.props.data.search)}
        </ul>
      </div>
    );
  }
}

export default graphql(query, {
  options: (props) => {
    const { query } = props.location.state;
    return { variables: { title: query } }
  }
})(SearchResults);
