// Dependencies
import React from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'

/**
 * The Icon component, based on FontAwesome.
 * @param {String} name      The name of the component must correspond to the
 *                           FontAwesome library name.
 * @param {String} className Any classes that should be applied to the icon.
 */
const Icon = ({ name, className }) => {
  if (!name) {
    return ''
  }

  let iconName = name.toLowerCase()

  // the API returns the type as movie, but we want to use the FontAwesome
  // 'film' icon.
  if (iconName === 'movie') {
    iconName = 'film'
  }

  return (
    <FontAwesome name={iconName} className={`o-icon ${className}`} />
  )
}

export default Icon

/**
 * Define the property types.
 * @type {Object}
 */
Icon.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
}

/**
 * Set the default values for each property.
 * @type {Object}
 */
Icon.defaultProps = {
  name: '',
  className: '',
}
