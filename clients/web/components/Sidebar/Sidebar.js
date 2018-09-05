// Dependencies
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import ReactGA from 'react-ga'

// Queries & mutations
import query from '../../queries/currentUser'
import mutation from '../../mutations/logout'

// App Components
import Icon from '../Icon/Icon'
// import PayMe from '../PayMe/PayMeContainer'

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

  /**
   * Call the logout mutation and update the currentUser query.
   */
  onLogoutClick = () => {
    // Log the event.
    ReactGA.event({
      category: 'Sidebar',
      action: 'Tap Logout',
    })

    this.props.mutate({
      refetchQueries: [{ query }],
    }).then(() => {
      this.props.closeSidebar()
    })
  }

  /**
   * Close the sidebar by calling the method handed down in props, and also
   * log the event.
   */
  closeSidebar = (event) => {
    const { pathname } = event.target

    if (event.type === 'keyup' && event.key !== 'Enter') {
      event.preventDefault()
      return false
    }

    let action = 'Close Sidebar'

    switch (pathname) {
      case '/login':
        action = 'Tap Login'
        break
      case '/signup':
        action = 'Tap Sign up'
        break
      case '/':
        action = 'Tap Unwatched'
        break
      case '/watch':
        action = 'Tap My Watchlist'
        break
      default:
        action = 'Close Sidebar'
    }

    // Log the event.
    ReactGA.event({
      category: 'Sidebar',
      action,
      label: pathname,
    })

    this.props.closeSidebar()

    return true
  }

  /**
   * Render the menu items based on whether or not the user is logged in.
   */
  renderMenuItems() {
    // If logged in, render the logout button and all other secure menu items.
    if (this.state.user) {
      return (
        <React.Fragment>
          <li>
            <button
              className="c-sidebar-menu-link"
              onClick={this.onLogoutClick}
              onKeyUp={this.onLogoutClick}
            >
              <Icon className="u-margin-right--small" name="lock" />
              Logout
            </button>
          </li>
          <li>
            <NavLink
              activeClassName="c-sidebar-menu-link--is-active"
              className="c-sidebar-menu-link"
              exact
              onClick={this.closeSidebar}
              onKeyUp={this.closeSidebar}
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
              onClick={this.closeSidebar}
              onKeyUp={this.closeSidebar}
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
      <React.Fragment>
        <li>
          <NavLink
            activeClassName="c-sidebar-menu-link--is-active"
            className="c-sidebar-menu-link"
            exact
            onClick={this.closeSidebar}
            onKeyUp={this.closeSidebar}
            title="Login"
            to="/login"
          >
            <Icon className="u-margin-right--small" name="unlock" />
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="c-sidebar-menu-link--is-active"
            className="c-sidebar-menu-link"
            exact
            onClick={this.closeSidebar}
            onKeyUp={this.closeSidebar}
            title="Sign up"
            to="/signup"
          >
            <Icon className="u-margin-right--small" name="user-plus" />
            Sign up
          </NavLink>
        </li>
      </React.Fragment>
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
          onClick={this.closeSidebar}
          onKeyUp={this.closeSidebar}
        >
          <Icon className="u-margin-right--small" name="chevron-left" />
        </button>
      </menu>
    )
  }
}

// TODO: pay me button
// <div className="c-sidebar-menu-link">
//   <PayMe />
// </div>

export default graphql(mutation)(graphql(query)(Sidebar))

/**
 * Define the property types.
 * @type {Object}
 */
Sidebar.propTypes = {
  closeSidebar: PropTypes.func,
  data: PropTypes.object,
  mutate: PropTypes.func,
  sidebarIsOpen: PropTypes.bool,
}

/**
 * Set the default values for each property.
 * @type {Object}
 */
Sidebar.defaultProps = {
  closeSidebar: () => {},
  data: {},
  mutate: () => {},
  sidebarIsOpen: false,
}
