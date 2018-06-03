/* eslint-env browser */

// Dependencies
import React from 'react'
import PropTypes from 'prop-types'

// App Components
import Icon from './Icon'

const reload = () => {
  window.location.reload(true)
}

const Error = ({ error }) => (
  <div className="o-container c-error u-flex">
    <Icon name="exclamation-circle" className="c-error-icon" />
    <h1>Whoops! Something went wrong!
      <p className="o-subheading">{error}</p>
    </h1>
    <button className="o-button c-error-button" onClick={reload}>
      Please try again
    </button>
  </div>
)

export default Error

/**
 * Define the types for each property.
 * @type {Object}
 */
Error.propTypes = {
  error: PropTypes.string,
}

/**
 * Define the default values for each property.
 * @type {Object}
 */
Error.defaultProps = {
  error: '',
}
