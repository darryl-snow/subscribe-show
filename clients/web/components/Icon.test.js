import React from 'react'
import { mount } from 'enzyme'
import Icon from './Icon'

describe('Icon Component', () => {
  it('should render', () => {
    const wrapper = mount(<Icon />)
    expect(wrapper.find('.o-icon').exists()).toBe(true)
    expect(wrapper.find('.fa').exists()).toBe(true)
  })
  it('should render the correct icon', () => {
    const testName = 'test'
    expect(mount(<Icon name={testName} />).find(`.fa-${testName}`).exists()).toBe(true)
  })
  it('should render a movie icon', () => {
    expect(mount(<Icon name="Movie" />).find('.fa-film').exists()).toBe(true)
  })
})
