// Dependencies
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

// Queries & mutations
import query from '../../queries/CurrentUser'

// App Components
import Context from '../../context'
import Icon from '../Icon/Icon'

/**
 * The Sidebar component is actually the app wrapper. The component renders 2
 * parts, the sidebar and the main content. The main content contains the children.
 * The method to toggle the state of the sidebar is passed down to children in
 * the context. The component is passed the current user from the query.
 */
export class Sidebar extends Component {
  constructor(props) {
    super(props)

    // Initialize the state. The sidebar is closed by default, and the user
    // is passed in the props.
    this.state = {
      open: false,
      user: props.data.user,
    }
  }
  // Update the state when the query updates the props.
  componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.data.user,
    })
  }
  // If the sidebar is open, toggle it closed.
  closeSidebar = () => {
    if (this.state.open) {
      this.toggleSidebar()
    }
  }
  // Toggle the component state and re-render the component.
  toggleSidebar = () => {
    this.setState({
      open: !this.state.open,
    })
  }
  // Render different menu items depending on whether the user is logged in.
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
    // Set the context to be passed to child components - in this case we pass
    // the toggle sidebar method so that it can be called from anywhere.
    const context = {
      toggleSidebar: this.toggleSidebar,
    }
    return (
      <Context.Provider value={context}>
        <div className={this.state.open ? 'c-app-container c-app-container--sidebar-open' : 'c-app-container'}>
          <menu className="c-sidebar">
            <ul className="c-sidebar-menu">
              {this.renderMenuItems()}
            </ul>
            <button
              className="c-sidebar-menu-link u-align--right"
              onClick={this.closeSidebar}
            >
              <Icon className="u-margin-right--small" name="chevron-left" />
            </button>
          </menu>
          <div
            className="c-main-content"
            onClick={this.closeSidebar}
            onKeyUp={this.closeSidebar}
            role="presentation"
          >
            {...this.props.children}
          </div>
        </div>
      </Context.Provider>
    )
  }
}

export default graphql(query)(Sidebar)

/**
 * Define the property types.
 * @type {Object}
 */
Sidebar.propTypes = {
  children: PropTypes.any,
  data: PropTypes.object,
}

/**
 * Set the default values for each property.
 * @type {Object}
 */
Sidebar.defaultProps = {
  children: <div />,
  data: {},
}
