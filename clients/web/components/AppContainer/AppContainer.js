// Dependencies
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// App Components
import Context from '../../context'
import MainContent from '../MainContent/MainContent'
import SidebarComponent from '../Sidebar/Sidebar'

// Styles
import './AppContainer.css'

/**
 * The AppContainer component is actually the app wrapper. The component renders 2
 * parts, the sidebar and the main content. The main content contains the children.
 * The method to toggle the state of the sidebar is passed down to children in
 * the context.
 */
export class AppContainer extends Component {
  constructor(props) {
    super(props)

    // Initialize the state. The sidebar is closed by default.
    this.state = {
      open: false,
    }
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
  render() {
    // Set the context to be passed to child components - in this case we pass
    // the toggle sidebar method so that it can be called from anywhere.
    const context = {
      toggleSidebar: this.toggleSidebar,
    }
    return (
      <Context.Provider value={context}>
        <div className={this.state.open ? 'c-app-container c-app-container--sidebar-is-open' : 'c-app-container'}>
          <SidebarComponent closeSidebar={this.closeSidebar} sidebarIsOpen={this.state.open} />
          <MainContent closeSidebar={this.closeSidebar} sidebarIsOpen={this.state.open}>
            {...this.props.children}
          </MainContent>
        </div>
      </Context.Provider>
    )
  }
}

export default AppContainer

/**
 * Define the property types.
 * @type {Object}
 */
AppContainer.propTypes = {
  children: PropTypes.any,
}

/**
 * Set the default values for each property.
 * @type {Object}
 */
AppContainer.defaultProps = {
  children: <div />,
}
