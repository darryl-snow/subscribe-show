import React from 'react'
import { mount, shallow } from 'enzyme'
import { Home } from './Home'

describe('Home Component', () => {
  it('should render a loader when the query is in progress', () => {
    const mockProps = {
      data: {
        loading: true,
      },
    }
    const component = mount(<Home {...mockProps} />)
    expect(component.find('.c-loader').exists()).toBe(true)
    expect(component.find('.c-auth-form').exists()).toBe(false)
  })
  it('should render a login form when there is no logged in user', () => {
    const mockProps = {
      data: {
        loading: false,
        user: null,
      },
    }
    const component = shallow(<Home {...mockProps} />)
    expect(component.find('.c-loader').exists()).toBe(false)
    expect(component.debug().toString().indexOf('Login')).not.toBe(-1)
  })
  it('should render a list when there is a logged in user', () => {
    const mockProps = {
      data: {
        loading: false,
        user: {
          id: '1',
          email: 'test@test.com',
        },
      },
    }
    const component = shallow(<Home {...mockProps} />)
    expect(component.find('.o-loader').exists()).toBe(false)
    expect(component.debug().toString().indexOf('Login')).toBe(-1)
    expect(component.find('Route').exists()).toBe(true)
  })
})
