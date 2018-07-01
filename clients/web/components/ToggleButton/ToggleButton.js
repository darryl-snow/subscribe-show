// Dependencies
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon/Icon'

/**
 * The ToggleButton component is a button that can support 2 states: on and off.
 * @extends Component
 */
class ToggleButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: true, // ON by default
    }
  }
  /**
   * What to do when the state is changed, the button is toggled.
   * @param  {Object} event The event that triggers this function.
   * @return {Boolean}      Dummy return value.
   */
  handleChange = (event) => {
    const { target } = event
    this.setState({
      checked: target.checked,
    })
    // Call any function that was passed down as a property, telling it the
    // value and the button state.
    this.props.handleChange(target.value, target.checked)
    return true
  }
  /**
   * Render the component.
   * @return {Object} The rendered component.
   */
  render() {
    const { value } = this.props
    return (
      <div className="c-toggle-button">
        <input
          id={value}
          value={value}
          type="checkbox"
          onChange={this.handleChange}
          checked={this.state.checked}
        />
        <label htmlFor={value} className="c-toggle-button-label u-align--center">
          <Icon name={value} className="u-margin-right--small" />
          <span>{value}</span>
        </label>
      </div>
    )
  }
}

export default ToggleButton

/**
 * Define the property types.
 * @type {Object}
 */
ToggleButton.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.string,
}

/**
 * Define the default values for each property.
 * @type {Object}
 */
ToggleButton.defaultProps = {
  handleChange: () => {},
  value: '',
}
