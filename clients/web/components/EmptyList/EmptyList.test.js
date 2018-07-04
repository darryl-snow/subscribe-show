import React from 'react'
import { shallow } from 'enzyme'
import EmptyList from './EmptyList'

describe('EmptyList Component', () => {
  it('should render', () => {
    const component = shallow(<EmptyList />)
    expect(component.find('.c-empty-list').exists()).toBe(true)
    expect(component.find('.c-empty-list-icon').exists()).toBe(true)
    expect(component.find('h1').exists()).toBe(true)
  })
  it('should render the correct message', () => {
    const testEmptyList = 'test'
    expect(shallow(<EmptyList message={testEmptyList} />).find('p').text()).toEqual(testEmptyList)
  })
})
