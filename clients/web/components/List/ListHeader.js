// Dependencies
import React from 'react'
import PropTypes from 'prop-types'

// App components
import ListControls from './ListControls'

// Styles
import './ListHeader.css'

/**
 * The ListHeader component, which contains a subheader any controls such as
 * sort and filter options. It's a stateless component.
 */
const ListHeader = (props) => {
  const {
    content,
  } = props

  return (
    <header className={`${props.className} c-list-header`}>
      <h2>{content}</h2>
      <ListControls />
    </header>
  )
}

export default ListHeader

/**
 * Define the property types.
 * @type {Object}
 */
ListHeader.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string,
}

/**
 * Define the default values for the property types.
 * @type {Object}
 */
ListHeader.defaultProps = {
  className: '',
  content: '',
}
