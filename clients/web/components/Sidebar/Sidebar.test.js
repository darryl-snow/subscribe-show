import React from 'react'
import { shallow } from 'enzyme'
import { Sidebar } from './Sidebar'

describe('Sidebar Component', () => {
  it('should render', () => {
    const component = shallow(<Sidebar />)
    expect(component.find('.c-sidebar').exists()).toBe(true)
    expect(component.find('.c-sidebar-menu').exists()).toBe(true)
  })
  it('should render a login button first when not logged in', () => {
    const component = shallow(<Sidebar />)
    expect(component.find('.c-sidebar-menu-link').at(0).debug()).toContain('Login')
    expect(component.find('.c-sidebar-menu-link').at(1).debug()).toContain('Sign up')
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
  it('should close the sidebar when the close sidebar button is clicked', () => {
    const closeSidebarMock = jest.fn()
    const mockProps = {
      closeSidebar: closeSidebarMock,
      sidebarIsOpen: true,
    }
    const component = shallow(<Sidebar {...mockProps} />)
    const mockedEvent = { target: {} }
    component.find('.c-sidebar-menu-link').last().simulate('click', mockedEvent)
    expect(closeSidebarMock.mock.calls).toHaveLength(1)
  })
})
