import React from 'react'
import { shallow } from 'enzyme'
import Header from './Header'

describe('Header Component', () => {
  it('should render', () => {
    const component = shallow(<Header />)
    expect(component.find('.c-header').exists()).toBe(true)
  })
})
