/* eslint-env browser */

// Dependencies
import React from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'

// App Components
import Icon from '../Icon/Icon'

// Styles
import './Error.css'

const reloadFunction = () => {
  window.location.reload(true)
}

const Error = ({ error, reload }) => {
  ReactGA.pageview('Error')

  return (
    <div className="o-container c-error u-flex">
      <Icon name="exclamation-circle" className="c-error-icon" />
      <h1>Whoops! Something went wrong!
        <p className="o-subheading">{error}</p>
      </h1>
      <button className="o-button o-button--red" onClick={reload}>
        Please try again
      </button>
    </div>
  )
}

export default Error

/**
 * Define the types for each property.
 * @type {Object}
 */
Error.propTypes = {
  error: PropTypes.string,
  reload: PropTypes.func,
}

/**
 * Define the default values for each property.
 * @type {Object}
 */
Error.defaultProps = {
  error: '',
  reload: reloadFunction,
}
