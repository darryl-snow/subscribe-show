import React, { Component } from 'react';
import ToggleButton from '../ToggleButton';

export default class ListFilters extends Component {
  constructor(props) {
    super(props);
    this.state = this.getFilters(props);
  }
  componentWillReceiveProps(nextProps) {
    this.setState(this.getFilters(nextProps));
  }
  changeFilter(value, checked) {
    const { filters } = this.state;

    if(!checked && filters.indexOf(value) !== -1)
      filters.splice(filters.indexOf(value), 1);

    if(checked && filters.indexOf(value) === -1)
      filters.push(value);

    this.setState({ filters }, this.props.updateList({
      filters
    }));
  }
  getFilters(props) {
    let languages = [];
    let types = [];

    props.results.map(result => {
      if(languages.indexOf(result.language) === -1)
        languages.push(result.language);
      if(types.indexOf(result.type) === -1)
        types.push(result.type);
    });

    return({
      filters: languages.concat(types),
      languages,
      types
    });
  }
  renderLanguageFilters() {
    return this.state.languages.map(language => {
      return (
        <ToggleButton key={language} value={language} handleChange={this.changeFilter.bind(this)} />
      );
    });
  }
  renderTypeFilters() {
    return this.state.types.map(type => {
      return (
        <ToggleButton key={type} value={type} handleChange={this.changeFilter.bind(this)} />
      );
    });
  }
  render() {
    return (
      <div className="c-list-filters u-flex u-margin-right--small">
        <div className="o-checkbox-group c-list-filters-group u-margin-right--small">
          {this.renderTypeFilters()}
        </div>
        <div className="o-checkbox-group c-list-filters-group">
          {this.renderLanguageFilters()}
        </div>
      </div>
    );
  }
}
