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
    this.state = {
      filters: [],
      items: [],
      languages: [],
      results: [],
      sortBy: 'airDate',
      sortOrder: 1,
      types: []
    };
  }
  componentWillReceiveProps(nextProps) {
    const results = nextProps.data.search;
    this.setState({ results }, this.sortResults);
  }
  changeSortBy(e) {
    this.setState({ sortBy: e.target.value }, this.sortResults);
  }
  changeSortOrder(e) {
    const { sortOrder } = this.state;
    this.setState({ sortOrder: sortOrder * -1 }, this.sortResults);
  }
  getFilters() {
    const types = this.getTypes();
    const languages = this.getLanguages();
    const filters = types.concat(languages);
    this.setState({ filters, languages, types }, () => {
      console.log(this.state);
    });
  }
  sortResults() {
    const dynamicSort = (property) => {
      return (a,b) => {
        const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * this.state.sortOrder;
      }
    }
    let tmp = this.state.results.slice();
    this.setState({ items: tmp.sort(dynamicSort(this.state.sortBy)) }, this.getFilters);
  }
  filterResults() {
    this.setState({ items: this.state.results.filter((result) => {
      return this.state.filters.includes(result.type) && this.state.filters.includes(result.language);
    })});
  }
  /**
   * [getResultsList description]
   * @param  {[type]} results [description]
   * @return {[type]}         [description]
   */
  getItemsList() {
    return this.state.items.map(item => {
      return (
        <li key={item.tmdbID}>
          <ListItem item={item} list="search" />
        </li>
      );
    });
  }
  changeFilter(value, checked) {

    const { filters } = this.state;

    if(!checked && filters.indexOf(value) !== -1) {
      filters.splice(filters.indexOf(value), 1);
      this.setState({ filters }, this.filterResults);
    }

    if(checked && filters.indexOf(value) === -1) {
      filters.push(value)
      this.setState({ filters }, this.filterResults);
    }

  }
  getLanguages() {
    let languages = [];
    this.state.results.map(result => {
      if(languages.indexOf(result.language) === -1)
        languages.push(result.language);
    });
    return languages;
  }
  getTypes() {
    let types = [];
    this.state.results.map(result => {
      if(types.indexOf(result.type) === -1)
        types.push(result.type);
    });
    return types;
  }
  getFilterButtons() {
    return (
      <div className="u-flex">
        <div className="o-checkbox-group u-inline-block u-margin-right--small">
          {this.getTypeButtons()}
        </div>
        <div className="o-checkbox-group u-inline-block u-margin-right--small">
          {this.getLanguageButtons()}
        </div>
      </div>
    )
    return this.state.filters.map(filter => {
      return (
        <ToggleButton key={filter} value={filter} handleChange={this.changeFilter.bind(this)} />
      );
    });
  }
  getLanguageButtons() {
    return this.state.languages.map(language => {
      return (
        <ToggleButton key={language} value={language} handleChange={this.changeFilter.bind(this)} />
      );
    });
  }
  getTypeButtons(types) {
    return this.state.types.map(type => {
      return (
        <ToggleButton key={type} value={type} handleChange={this.changeFilter.bind(this)} />
      );
    });
  }
  getTypeFilters() {
    let types = this.getTypes();
    if(types.length === 1)
      return '';
    else {
      return(
        <div className="o-checkbox-group u-inline u-margin-right--small">
          {this.getTypeButtons(types)}
        </div>
      );
    }
  }
  getLanguageFilters() {
    let languages = this.getLanguages();
    if(languages.length === 1)
      return '';
    else {
      return(
        <div className="o-checkbox-group u-inline u-margin-right--small">
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
          <h2 className="u-no-margin">Displaying {this.state.items.length} results</h2>
          <div className="u-flex">
            <div className="o-checkbox-group u-inline u-margin-right--small">
              {this.getFilterButtons()}
            </div>
            <select className="o-select o-label u-margin-right--small" defaultValue={this.state.sortBy} onChange={this.changeSortBy.bind(this)}>
              <option value="" disabled>Sort by&hellip;</option>
              <option value="title">Title</option>
              <option value="airDate">Release Date</option>
            </select>
            <button className='o-label o-label--button' onClick={this.changeSortOrder.bind(this)}>
              <Icon name='sort' />
            </button>
          </div>
        </div>
        <ul className="u-unstyled-list">
          {this.getItemsList()}
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
