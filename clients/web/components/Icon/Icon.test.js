import React from 'react'
import { mount } from 'enzyme'
import Icon from './Icon'

describe('Icon Component', () => {
  it('should render', () => {
    const testName = 'test'
    const wrapper = mount(<Icon name={testName} />)
    expect(wrapper.find('.o-icon').exists()).toBe(true)
    expect(wrapper.find(`.fa-${testName}`).exists()).toBe(true)
  })
  it('should render a film icon correctly for movie items', () => {
    expect(mount(<Icon name="Movie" />).find('.fa-film').exists()).toBe(true)
  })
})
