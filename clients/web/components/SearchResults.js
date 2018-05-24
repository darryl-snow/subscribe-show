import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/search';
import history from '../history';
import Loader from './Loader';
import ListItem from './ListItem';
import Icon from './Icon';

/**
 * [SearchResults description]
 * @extends Component
 */
class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = { results: [] };
  }
  componentWillReceiveProps(nextProps) {
    const results = nextProps.data.search;
    this.setState({ results });
  }
  /**
   * [getResultsList description]
   * @param  {[type]} results [description]
   * @return {[type]}         [description]
   */
  getResultsList() {
    return this.state.results.map(result => {
      return (
        <li key={result.tmdbID}>
          <ListItem item={result} list="search" />
        </li>
      );
    });
  }
  getLanguages() {
    let languages = [];
    this.state.results.map(result => {
      if(languages.indexOf(result.language) === -1)
        languages.push(result.language);
    });
    return languages;
  }
  getLanguageButtons(languages) {
    return languages.map(language => {
      return (
        <button key={language} className="o-button-group-item">
          {language}
        </button>
      );
    });
  }
  getLanguageFilters() {
    let languages = this.getLanguages();
    if(languages.length === 1)
      return '';
    else {
      return(
        <div className="o-button-group">
          {this.getLanguageButtons(languages)}
        </div>
      );
    }
  }
  /**
   * Render the component
   * @return {[type]} [description]
   */
  render() {
    const query = this.props.location.state.query;
    if (this.props.data.loading) { return <Loader />; }
    return (
      <div className="o-container">
        <h1>Search Results for {query}</h1>
        <div className="o-panel u-margin-bottom u-padding--small">
          <button>
            <Icon name="film" />
          </button>
          <button>
            <Icon name="tv" />
          </button>
          {this.getLanguageFilters()}
        </div>
        <ul className="u-unstyled-list">
          {this.getResultsList()}
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
