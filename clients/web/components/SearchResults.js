import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/search';
import history from '../history';
import Loader from './Loader';
import ListItem from './ListItem';
import Icon from './Icon';
import ToggleButton from './ToggleButton';

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
        <ToggleButton key={language} value={language} />
      );
    });
  }
  getLanguageFilters() {
    let languages = this.getLanguages();
    if(languages.length === 1)
      return '';
    else {
      return(
        <div className="o-checkbox-group u-inline">
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
        <div className="c-filters u-margin-bottom">
          <h2 className="u-no-margin">Displaying {this.state.results.length} results</h2>
          <div className="u-flex">
            <div className="o-checkbox-group u-inline u-margin-right--small">
              <ToggleButton value="film" />
              <ToggleButton value="tv" />
            </div>
            {this.getLanguageFilters()}
          </div>
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
