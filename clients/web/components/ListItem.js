import React, { Component } from 'react';
import Icon from './Icon';

export default class ListItem extends Component {
  getButtons() {
    const { list } = this.props;
    if (list === "search") {
      return (
        <button className="c-button">
          <Icon name="plus" className="u-margin-right--small" />
          Add to watchlist
        </button>
      );
    }
    return '';
  }
  render() {
    const { title, description, language, image, type } = this.props.item;
    const { list } = this.props;
    return (
      <div className="c-list-item">
        <div className="c-list-item-image" style={{backgroundImage: `url(${image})`}} />
        <div className="c-list-item-details">
          <h2>
            <Icon name={type} className="u-margin-right" />
            {title}
          </h2>
          <span className="o-label">{language}</span>
          <p>{description}</p>
          {this.getButtons()}
        </div>
      </div>
    );
  }
}
