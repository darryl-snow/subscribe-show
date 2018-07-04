/* eslint-env browser */

// Dependencies
import React from 'react'
import PropTypes from 'prop-types'

// App Components
import Icon from '../Icon/Icon'

const EmptyList = ({ message }) => (
  <div className="o-container c-empty-list u-flex">
    <Icon name="meh-o" className="c-empty-list-icon" />
    <h1>Nothing here!</h1>
    <p>{message}</p>
  </div>
)

export default EmptyList

/**
 * Define the types for each property.
 * @type {Object}
 */
EmptyList.propTypes = {
  message: PropTypes.string,
}

/**
 * Define the default values for each property.
 * @type {Object}
 */
EmptyList.defaultProps = {
  message: '',
}
