import React, { Component } from 'react';
import Icon from '../Icon';

export default class ListSorter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: props.sortBy,
      sortOrder: props.sortOrder
    };
  }
  changeSortBy(event) {
    const sortBy = event.target.value;
    this.props.updateList({ sortBy });
  }
  changeSortOrder(event) {
    event.preventDefault();
    this.props.updateList({ sortOrder: this.props.sortOrder * -1 });
  }
  render() {
    return (
      <div className='c-list-sorter u-flex'>
        <select
          className="o-select o-label c-list-sort-order-select u-margin-right--small"
          defaultValue={this.state.sortBy}
          onChange={this.changeSortBy.bind(this)}
        >
          <option value="" disabled>Sort by&hellip;</option>
          <option value="airDate">Release Date</option>
          <option value="title">Title</option>
        </select>
        <button
          className='o-label c-list-sort-order-button'
          onClick={this.changeSortOrder.bind(this)}
        >
          <Icon name='sort' />
        </button>
      </div>
    );
  }
}
