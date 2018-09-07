// Dependencies
import React from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'

import { removeSpaces } from '../../helpers'

// Styles
import './Breadcrumbs.css'

/**
 * This component renders a list of page navigation links, e.g. Season 1,
 * Season 2, etc. It requires the list of items to display. The display names
 * should be the same as the anchor names.
 * @param {[type]} props [description]
 */
const Breadcrumbs = (props) => {
  const { list } = props
  const onClick = (event) => {
    // Log the event.
    ReactGA.event({
      category: 'Breadcrumbs',
      action: 'Click',
      label: event.target.getAttribute('title'),
    })
  }
  const renderListItems = () => {
    // Do not render anything if there is not more than 1 item.
    if (list.length < 2) {
      return ''
    }
    return list.map(item => (
      <li
        key={item}
        className="c-breadcrumbs-item u-display--inline-block u-margin-bottom"
      >
        <a
          className="o-link c-breadcrumbs-link u-margin-left--small u-margin-right--small"
          href={removeSpaces(`${item}`)}
          onClick={onClick}
          title={item}
        >
          {`${item}`}
        </a>
      </li>
    ))
  }
  return (
    <ol className="c-breadcrumbs u-unstyled-list">
      {renderListItems()}
    </ol>
  )
}

export default Breadcrumbs

/**
 * Define the property types.
 * @type {Object}
 */
Breadcrumbs.propTypes = {
  list: PropTypes.array,
}

/**
 * Set the default values for each property.
 * @type {Object}
 */
Breadcrumbs.defaultProps = {
  list: [],
}
