import React from 'react'
import { shallow } from 'enzyme'
import Error from './Error'

const reloadMock = jest.fn()

describe('Error Component', () => {
  it('should render', () => {
    const wrapper = shallow(<Error />)
    expect(wrapper.find('.c-error').exists()).toBe(true)
    expect(wrapper.find('.c-error-icon').exists()).toBe(true)
    expect(wrapper.find('h1').exists()).toBe(true)
    expect(wrapper.find('.c-error-button').exists()).toBe(true)
  })
  it('should render the correct error message', () => {
    const testError = 'test'
    expect(shallow(<Error error={testError} />).find('.o-subheading').text()).toEqual(testError)
  })
  it('should reload when the button is clicked', () => {
    const wrapper = shallow(<Error reload={reloadMock} />)
    wrapper.find('.c-error-button').simulate('click')
    expect(reloadMock.mock.calls.length).toBe(1)
  })
})
