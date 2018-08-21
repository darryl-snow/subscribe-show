// Dependencies
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

// Queries & mutations
import query from '../../queries/CurrentUser'

// App Components
import Icon from '../Icon/Icon'

// Styles
import './Sidebar.css'

/**
 * The Sidebar component is the main menu for the app. It presents different
 * menu items based on whether or not the user is logged in.
 */
export class Sidebar extends Component {
  constructor(props) {
    super(props)

    // Initialize the state. The user is passed in the props.
    this.state = {
      user: props.data.user,
    }
  }
  // Update the state when the query updates the props.
  componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.data.user,
    })
  }
  renderMenuItems() {
    // If logged in, render the logout button and all other secure menu items.
    if (this.state.user) {
      return (
        <React.Fragment>
          <li>
            <NavLink
              activeClassName="c-sidebar-menu-link--is-active"
              className="c-sidebar-menu-link"
              exact
              onClick={this.toggleSidebar}
              title="Logout"
              to="/logout"
            >
              <Icon className="u-margin-right--small" name="lock" />
              Logout
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="c-sidebar-menu-link--is-active"
              className="c-sidebar-menu-link"
              exact
              onClick={this.toggleSidebar}
              title="Unwatched"
              to="/"
            >
              <Icon className="u-margin-right--small" name="home" />
              Unwatched
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="c-sidebar-menu-link--is-active"
              className="c-sidebar-menu-link"
              exact
              onClick={this.toggleSidebar}
              title="My watchlist"
              to="/watch"
            >
              <Icon className="u-margin-right--small" name="list-ul" />
              My Watchlist
            </NavLink>
          </li>
        </React.Fragment>
      )
    }
    // If not logged in, just render a login button.
    return (
      <li>
        <NavLink
          activeClassName="c-sidebar-menu-link--is-active"
          className="c-sidebar-menu-link"
          exact
          onClick={this.toggleSidebar}
          title="Login"
          to="/login"
        >
          <Icon className="u-margin-right--small" name="unlock" />
          Login
        </NavLink>
      </li>
    )
  }
  render() {
    return (
      <menu className={this.props.sidebarIsOpen ? 'c-sidebar c-sidebar--is-open' : 'c-sidebar'}>
        <ul className="c-sidebar-menu">
          {this.renderMenuItems()}
        </ul>
        <button
          className="c-sidebar-menu-link u-align--right"
          onClick={this.props.closeSidebar}
        >
          <Icon className="u-margin-right--small" name="chevron-left" />
        </button>
      </menu>
    )
  }
}

export default graphql(query)(Sidebar)

/**
 * Define the property types.
 * @type {Object}
 */
Sidebar.propTypes = {
  closeSidebar: PropTypes.func,
  data: PropTypes.object,
  sidebarIsOpen: PropTypes.bool,
}

/**
 * Set the default values for each property.
 * @type {Object}
 */
Sidebar.defaultProps = {
  closeSidebar: () => {},
  data: {},
  sidebarIsOpen: false,
}
