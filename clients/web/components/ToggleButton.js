import React, { Component } from 'react';
import Icon from './Icon';

class ToggleButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true
    };
  }
  handleChange(e) {
    this.setState({
      checked: e.target.checked
    });
  }
  render() {
    const { value } = this.props;
    console.log(value);
    return (
      <div className='o-checkbox-container'>
        <input id={value} type='checkbox' onChange={this.handleChange.bind(this)} checked={this.state.checked}  />
        <label htmlFor={value}>
          <Icon name={value} className='u-margin-right--small' />
          <span className='u-margin-right--small'>{value}</span>
        </label>
      </div>
    );
  }
}

export default ToggleButton;
