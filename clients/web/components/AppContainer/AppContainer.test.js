import React from 'react'
import { shallow } from 'enzyme'
import { AppContainer } from './AppContainer'

describe('AppContainer Component', () => {
  it('should render', () => {
    const component = shallow(<AppContainer />)
    expect(component.find('.c-app-container').exists()).toBe(true)
  })
  it('should be able to toggle the sidebar open and closed', () => {
    const component = shallow(<AppContainer />)
    expect(component.state().open).toBe(false)
    expect(component.find('.c-app-container--sidebar-is-open').exists()).toBe(false)
    component.instance().toggleSidebar()
    expect(component.state().open).toBe(true)
    component.update()
    expect(component.find('.c-app-container--sidebar-is-open').exists()).toBe(true)
    component.instance().toggleSidebar()
    expect(component.state().open).toBe(false)
    component.update()
    expect(component.find('.c-app-container--sidebar-is-open').exists()).toBe(false)
  })
})
