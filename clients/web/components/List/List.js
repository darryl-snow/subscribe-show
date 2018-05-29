import React, { Component } from 'react';
import ListHeader from './ListHeader';
import ListItem from './ListItem';

export default class List extends Component {
  renderListItems() {
    return this.props.listItems.map(item => {
      return (
        <li key={item.tmdbID}>
          <ListItem item={item} />
        </li>
      );
    });
  }
  render() {
    return (
      <div className='c-list'>
        <ul className='u-unstyled-list'>
          {this.renderListItems()}
        </ul>
      </div>
    );
  }
}
