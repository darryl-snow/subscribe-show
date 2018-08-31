import React from 'react'
import { shallow } from 'enzyme'
import { Register } from './Register'

describe('Register Component', () => {
  it('should render a loader when the query or mutation is in progress', () => {
    let mockProps = {
      data: {
        loading: true,
      },
    }
    let component = shallow(<Register {...mockProps} />)
    component.setState({
      loading: false,
    })
    expect(component.find('Loader').exists()).toBe(true)

    mockProps = {
      data: {
        loading: false,
      },
    }
    component = shallow(<Register {...mockProps} />)
    component.setState({
      loading: true,
    })
    expect(component.find('Loader').exists()).toBe(true)

    mockProps = {
      data: {
        loading: true,
      },
    }
    component = shallow(<Register {...mockProps} />)
    component.setState({
      loading: true,
    })
    expect(component.find('Loader').exists()).toBe(true)

    mockProps = {
      data: {
        loading: false,
      },
    }
    component = shallow(<Register {...mockProps} />)
    component.setState({
      loading: false,
    })
    expect(component.find('Loader').exists()).toBe(false)
  })
  it('should render the auth form', () => {
    const mockProps = {
      data: {
        loading: false,
      },
    }
    const component = shallow(<Register {...mockProps} />)
    component.setState({
      loading: false,
    })
    expect(component.find('AuthForm').exists()).toBe(true)
  })
})
