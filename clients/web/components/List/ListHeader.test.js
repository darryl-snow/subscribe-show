import React from 'react'
import { mount, shallow } from 'enzyme'
import ListHeader from './ListHeader'

describe('ListHeader Component', () => {
  it('should render', () => {
    const wrapper = mount(<ListHeader />)
    expect(wrapper.find('.c-list-header').exists()).toBe(true)
    expect(wrapper.find('.c-list-header-controls').exists()).toBe(true)
    expect(wrapper.find('.c-list-filters').exists()).toBe(true)
    expect(wrapper.find('.c-list-sorter').exists()).toBe(true)
  })
  it('should have the correct heading', () => {
    const mockContent = 'test'
    const wrapper = shallow(<ListHeader content={mockContent} />)
    expect(wrapper.find('h2').text()).toEqual(mockContent)
  })
})
