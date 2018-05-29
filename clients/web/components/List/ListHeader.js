import React, { Component } from 'react';
import ListFilters from './ListFilters';
import ListSorter from './ListSorter';

export default class ListHeader extends Component {
  render() {
    const {
      content,
      defaultSort,
      results,
      sortOrder,
      updateList
    } = this.props;

    return (
      <header className='c-list-header u-flex'>
        <h2>{content}</h2>
        <div className='c-list-header-controls u-flex'>
          <ListFilters results={results} updateList={updateList} />
          <ListSorter
            defaultSort={defaultSort}
            sortOrder={sortOrder}
            updateList={updateList}
          />
        </div>
      </header>
    );
  }
}
