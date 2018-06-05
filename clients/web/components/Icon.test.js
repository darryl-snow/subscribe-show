import React from 'react'
import { mount } from 'enzyme'
import Icon from './Icon'

describe('Icon Component', () => {
  it('should render', () => {
    expect(mount(<Icon />).find('.o-icon').exists()).toBe(true)
    expect(mount(<Icon />).find('.fa').exists()).toBe(true)
  })
  it('should render the correct icon', () => {
    const testName = 'test'
    expect(mount(<Icon name={testName} />).find(`.fa-${testName}`).exists()).toBe(true)
  })
  it('should render a movie icon', () => {
    expect(mount(<Icon name="Movie" />).find('.fa-film').exists()).toBe(true)
  })
})
