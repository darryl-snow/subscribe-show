import React from 'react'
import { shallow } from 'enzyme'
import AuthForm from './AuthForm'

describe('AuthForm Component', () => {
  it('should render', () => {
    const component = shallow(<AuthForm />)
    expect(component.find('.c-form').exists()).toBe(true)
    expect(component.find('.o-input').exists()).toBe(true)
    expect(component.find('.o-input-label').exists()).toBe(true)
    expect(component.find('.o-input-field').exists()).toBe(true)
    expect(component.find('#email').exists()).toBe(true)
    expect(component.find('#password').exists()).toBe(true)
    expect(component.find('.c-form-errors').exists()).toBe(true)
    expect(component.find('.o-button').exists()).toBe(true)
  })
  it('should call the login or register method when the form is submitted', () => {
    const mockFunction = jest.fn()
    const component = shallow(<AuthForm onSubmit={mockFunction} />)
    const mockedEvent = {
      preventDefault: () => {},
    }
    component.simulate('submit', mockedEvent)
    expect(mockFunction.mock.calls.length).toBe(1)
  })
})
