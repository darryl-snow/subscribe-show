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
    this.props.handleChange(e.target.value, e.target.checked);
  }
  render() {
    const { value } = this.props;
    return (
      <div className='o-checkbox-container'>
        <input id={value} value={value} type='checkbox' onChange={this.handleChange.bind(this)} checked={this.state.checked}  />
        <label htmlFor={value} className='o-checkbox'>
          <Icon name={value} className='u-margin-right--small' />
          <span className='u-margin-right--small'>{value}</span>
        </label>
      </div>
    );
  }
}

export default ToggleButton;
