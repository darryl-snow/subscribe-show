// Dependencies
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'

// App components
import Icon from '../Icon/Icon'

// Styles
import './ToggleButton.css'

/**
 * The ToggleButton component is a button that can support 2 states: on and off.
 * @extends Component
 */
class ToggleButton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      checked: props.checked,
    }
  }
  /**
   * What to do when the state is changed, the button is toggled.
   * @param  {Object} event The event that triggers this function.
   * @return {Boolean}      Dummy return value.
   */
  handleChange = (event) => {
    const { target } = event

    // Log the event.
    ReactGA.event({
      category: 'Toggle Button',
      action: `Toggle ${target.value}`,
      label: target.checked,
    })

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
      <label
        className={this.state.checked ? 'c-toggle-button c-toggle-button--is-checked' : 'c-toggle-button'}
        htmlFor={value}
      >
        <input
          checked={this.state.checked}
          className="c-toggle-button-input"
          id={value}
          onChange={this.handleChange}
          type="checkbox"
          value={value}
        />
        <Icon
          className="c-toggle-button-icon"
          name={this.state.checked ? 'check-circle' : 'times-circle'}
        />
        {value}
      </label>
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
  checked: PropTypes.bool,
  value: PropTypes.string,
}

/**
 * Define the default values for each property.
 * @type {Object}
 */
ToggleButton.defaultProps = {
  handleChange: () => {},
  checked: true,
  value: '',
}
