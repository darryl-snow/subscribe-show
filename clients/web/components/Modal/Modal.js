/* eslint-env browser */

// Dependencies
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// App Components
import Icon from '../Icon/Icon'

// Styles
import './Modal.css'

/**
 * The modal component presents an overlay and a modal content window.
 * @type {Object}
 */
export default class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShown: props.isShown,
    }
  }

  /**
   * Update the state when new props are passed in.
   * @param  {Object} nextProps The new props.
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      isShown: nextProps.isShown,
    })
  }

  /**
   * Buttons are the only way to dismiss the modal. If the component receives
   * a type property of confirm, the component will render 2 options,
   * otherwise just 1.
   */
  renderButtons() {
    // No confirmation needed so 1 OK button to dismiss the modal.
    if (this.props.type !== 'confirm') {
      return (
        <button
          className="o-button c-modal-button u-margin-top"
          onClick={this.props.close}
        >
          OK
        </button>
      )
    }

    // If it is a confirm type, render 2 buttons, 1 to dismiss the
    // modal and 1 to call the confirm function.
    return (
      <div className="o-button-group c-modal-button-group u-margin-top">
        <button
          className="o-button o-button--secondary c-modal-button"
          onClick={this.props.close}
        >
          Cancel
        </button>
        <button
          className="o-button c-modal-button"
          onClick={this.props.confirm}
        >
          Confirm
        </button>
      </div>
    )
  }

  render() {
    const {
      icon,
    } = this.props

    return (
      <div className={this.state.isShown ? 'c-modal c-modal--is-shown' : 'c-modal'}>
        <div className="c-modal-content">
          <Icon name={icon} className="c-modal-icon u-margin-bottom" />
          {this.props.children}
          {this.renderButtons()}
        </div>
      </div>
    )
  }
}

/**
 * Define the types for each property.
 * @type {Object}
 */
Modal.propTypes = {
  children: PropTypes.string,
  close: PropTypes.func,
  confirm: PropTypes.func,
  icon: PropTypes.string,
  isShown: PropTypes.bool,
  type: PropTypes.string,
}

/**
 * Define the default values for each property.
 * @type {Object}
 */
Modal.defaultProps = {
  children: '',
  close: () => {},
  confirm: () => {},
  icon: '',
  isShown: false,
  type: '',
}
