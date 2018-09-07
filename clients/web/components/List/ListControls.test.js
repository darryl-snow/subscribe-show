import React from 'react'
import { shallow } from 'enzyme'
import ListControls from './ListControls'

describe('ListControls Component', () => {
  it('should render', () => {
    const component = shallow(<ListControls />)
    expect(component.find('.c-list-controls').exists()).toBe(true)
  })
  it('should be able to toggle the controls open and closed', () => {
    const analyticsMock = {
      event: () => {},
    }
    const component = shallow(<ListControls analytics={analyticsMock} />)
    const button = component.find('.o-button')
    expect(component.find('.c-list-controls--is-open').exists()).toBe(false)
    button.simulate('click')
    component.update()
    expect(component.find('.c-list-controls--is-open').exists()).toBe(true)
  })
})
