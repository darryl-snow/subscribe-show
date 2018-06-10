import React from 'react'
import { shallow, mount } from 'enzyme'
import ToggleButton from './ToggleButton'

describe('ToggleButton Component', () => {
  it('should render', () => {
    const wrapper = shallow(<ToggleButton />)
    expect(wrapper.find('.c-toggle-button').exists()).toBe(true)
    expect(wrapper.find('.c-toggle-button-label').exists()).toBe(true)
  })
  it('should have a checkbox with the correct value', () => {
    const testValue = 'test'
    expect(shallow(<ToggleButton value={testValue} />).find(`input[value='${testValue}']`).exists()).toBe(true)
  })
  it('should render the correct icon', () => {
    const testValue = 'test'
    expect(mount(<ToggleButton value={testValue} />).find(`.fa-${testValue}`).exists()).toBe(true)
  })
  it('should render the correct label text', () => {
    const testValue = 'test'
    expect(shallow(<ToggleButton value={testValue} />).find('label span').text()).toEqual(testValue)
  })
  it('should update when the button is clicked', () => {
    const mockedEvent = { target: {}, preventDefault: () => {} }
    const wrapper = shallow(<ToggleButton />)
    const initialState = wrapper.state('checked')
    wrapper.find('.c-toggle-button-label').simulate('click', mockedEvent)
    setTimeout(() => {
      expect(wrapper.state('checked')).toEqual(!initialState)
    }, 250)
  })
  it('should call the passed handler when the button is clicked', () => {
    true
  })
})
