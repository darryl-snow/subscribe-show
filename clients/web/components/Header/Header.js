// Dependencies
import React from 'react'

// App Components
import Context from '../../context'
import Icon from '../Icon/Icon'
import SearchForm from '../SearchForm/SearchForm'

// Styles
import './Header.css'

/**
 * The header component.
 */
const Header = () => (
  <div className="c-header u-align--center">
    <Context.Consumer>
      {context => (
        <button
          className="c-header-link"
          onClick={context.toggleSidebar}
          title="Menu"
        >
          <Icon name="bars" />
        </button>
      )}
    </Context.Consumer>
    <SearchForm />
  </div>
)

export default Header
