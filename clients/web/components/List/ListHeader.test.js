import React from 'react'
import { mount, shallow } from 'enzyme'
import ListHeader from './ListHeader'

describe('ListHeader Component', () => {
  it('should render', () => {
    const component = mount(<ListHeader />)
    expect(component.find('.c-list-header').exists()).toBe(true)
    expect(component.find('.c-list-header-controls').exists()).toBe(true)
    expect(component.find('.c-list-filters').exists()).toBe(true)
    expect(component.find('.c-list-sorter').exists()).toBe(true)
  })
  it('should have the correct heading', () => {
    const mockContent = 'test'
    const component = shallow(<ListHeader content={mockContent} />)
    expect(component.find('h2').text()).toEqual(mockContent)
  })
})
