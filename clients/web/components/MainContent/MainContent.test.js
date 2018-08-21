import React from 'react'
import { shallow } from 'enzyme'
import MainContent from './MainContent'

describe('MainContent Component', () => {
  it('should render', () => {
    const component = shallow(<MainContent />)
    expect(component.find('.c-main-content').exists()).toBe(true)
  })
  it('should try to close the sidebar when clicked when the sidebar is open', () => {
    let closeSidebarMock = jest.fn()
    let mockProps = {
      closeSidebar: closeSidebarMock,
      sidebarIsOpen: false,
    }
    let component = shallow(<MainContent {...mockProps} />)
    component.simulate('click')
    expect(closeSidebarMock.mock.calls).toHaveLength(0)

    closeSidebarMock = jest.fn()
    mockProps = {
      closeSidebar: closeSidebarMock,
      sidebarIsOpen: true,
    }
    component = shallow(<MainContent {...mockProps} />)
    component.simulate('click')
    expect(closeSidebarMock.mock.calls).toHaveLength(1)
  })
})
