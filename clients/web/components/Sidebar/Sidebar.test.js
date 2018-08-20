import React from 'react'
import { shallow } from 'enzyme'
import { Sidebar } from './Sidebar'

describe('Sidebar Component', () => {
  it('should render', () => {
    const component = shallow(<Sidebar />)
    expect(component.find('.c-app-container').exists()).toBe(true)
    expect(component.find('.c-sidebar').exists()).toBe(true)
    expect(component.find('.c-sidebar-menu').exists()).toBe(true)
    expect(component.find('.c-main-content').exists()).toBe(true)
  })
  it('should render a login button first when not logged in', () => {
    const component = shallow(<Sidebar />)
    expect(component.find('.c-sidebar-menu-link').first().debug()).toContain('Login')
  })
  it('should render navigation buttons when logged in', () => {
    const mockData = {
      user: {},
    }
    const component = shallow(<Sidebar data={mockData} />)
    expect(component.find('[title="Unwatched"]').exists()).toBe(true)
    expect(component.find('[title="My watchlist"]').exists()).toBe(true)
  })
  it('should render a logout button when logged in', () => {
    const mockData = {
      user: {},
    }
    const component = shallow(<Sidebar data={mockData} />)
    expect(component.find('.c-sidebar-menu-link').first().debug()).toContain('Logout')
  })
  it('should be able to toggle the sidebar open and closed', () => {
    const component = shallow(<Sidebar />)
    expect(component.state().open).toBe(false)
    expect(component.find('.c-app-container--sidebar-open').exists()).toBe(false)
    component.instance().toggleSidebar()
    expect(component.state().open).toBe(true)
    component.update()
    expect(component.find('.c-app-container--sidebar-open').exists()).toBe(true)
    component.instance().toggleSidebar()
    expect(component.state().open).toBe(false)
    component.update()
    expect(component.find('.c-app-container--sidebar-open').exists()).toBe(false)
  })
  it('should close the sidebar when main content is clicked and when the sidebar is open', () => {
    const component = shallow(<Sidebar />)
    const mainContent = component.find('.c-main-content')

    // Sidebar is not open by default
    expect(component.state().open).toBe(false)
    expect(component.find('.c-app-container--sidebar-open').exists()).toBe(false)

    // Clicking the main content when the sidebar is not open should not change anything
    mainContent.simulate('click')
    component.update()
    expect(component.state().open).toBe(false)
    expect(component.find('.c-app-container--sidebar-open').exists()).toBe(false)

    // Toggle (open) the sidebar
    component.instance().toggleSidebar()
    component.update()
    expect(component.state().open).toBe(true)
    expect(component.find('.c-app-container--sidebar-open').exists()).toBe(true)

    // Clicking the main content when the sidebar is open should close it
    mainContent.simulate('click')
    component.update()
    expect(component.state().open).toBe(false)
    expect(component.find('.c-app-container--sidebar-open').exists()).toBe(false)
  })
})
