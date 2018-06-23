import React from 'react'
import { shallow } from 'enzyme'
import Error from './Error'

const reloadMock = jest.fn()

describe('Error Component', () => {
  it('should render', () => {
    const component = shallow(<Error />)
    expect(component.find('.c-error').exists()).toBe(true)
    expect(component.find('.c-error-icon').exists()).toBe(true)
    expect(component.find('h1').exists()).toBe(true)
    expect(component.find('.c-error-button').exists()).toBe(true)
  })
  it('should render the correct error message', () => {
    const testError = 'test'
    expect(shallow(<Error error={testError} />).find('.o-subheading').text()).toEqual(testError)
  })
  it('should reload when the button is clicked', () => {
    const component = shallow(<Error reload={reloadMock} />)
    component.find('.c-error-button').simulate('click')
    expect(reloadMock.mock.calls.length).toBe(1)
  })
})
