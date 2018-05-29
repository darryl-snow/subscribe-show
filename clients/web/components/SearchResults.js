import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/search';
import history from '../history';

import List from './List/List';
import ListHeader from './List/ListHeader';
import Loader from './Loader';

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: [],
      listItems: [],
      results: [],
      sortBy: 'airDate',
      sortOrder: 1
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      listItems: nextProps.data.search,
      results: nextProps.data.search
    }, this.sortList);
  }
  sortList() {
    const dynamicSort = (property) => {
      return (a,b) => {
        const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * this.state.sortOrder;
      }
    }
    let tmp = this.state.listItems.slice();
    this.setState({ listItems: tmp.sort(dynamicSort(this.state.sortBy)) });
  }
  filterList() {
    this.setState({ listItems: this.state.results.filter((result) => {
      return this.state.filters.includes(result.type) && this.state.filters.includes(result.language);
    })});
  }
  updateList(args) {

    if(args.filters)
      this.setState({ filters: args.filters }, this.filterList);

    if(args.sortBy)
      this.setState({ sortBy: args.sortBy }, this.sortList);

    if(args.sortOrder)
      this.setState({ sortOrder: args.sortOrder }, this.sortList);

  }
  render() {
    const { listItems, results, sortBy, sortFields, sortOrder } = this.state;
    const query = this.props.location.state.query;
    if (this.props.data.loading) { return <Loader />; }
    return(
      <div className='c-search-results o-container'>
        <h1>Search results for {query}</h1>
        <ListHeader
          className='c-search-results-header'
          content={`Displaying ${listItems.length} results`}
          defaultSort={sortBy}
          results={results}
          sortOrder={sortOrder}
          updateList={this.updateList.bind(this)}
        />
        <List
          className='c-search-results-list'
          listItems={listItems}
        />
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
