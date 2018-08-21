// Dependencies
import React from 'react'
import PropTypes from 'prop-types'

// Styles
import './MainContent.css'

const MainContent = (props) => {
  const closeSidebar = () => {
    if (props.sidebarIsOpen) {
      props.closeSidebar()
    }
  }
  return (
    <div
      className={props.sidebarIsOpen ? 'c-main-content c-main-content--is-minimized' : 'c-main-content'}
      onClick={closeSidebar}
      onKeyUp={closeSidebar}
      role="presentation"
    >
      {...props.children}
    </div>
  )
}

export default MainContent

/**
 * Define the property types.
 * @type {Object}
 */
MainContent.propTypes = {
  children: PropTypes.any,
  closeSidebar: PropTypes.func,
  sidebarIsOpen: PropTypes.bool,
}

/**
 * Set the default values for each property.
 * @type {Object}
 */
MainContent.defaultProps = {
  children: <div />,
  closeSidebar: () => {},
  sidebarIsOpen: false,
}
