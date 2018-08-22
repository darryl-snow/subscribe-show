import React from 'react'
import { mount, shallow } from 'enzyme'
import Breadcrumbs from './Breadcrumbs'
import { removeSpaces } from '../../helpers'

describe('Breadcrumbs Component', () => {
  it('should render', () => {
    const component = shallow(<Breadcrumbs />)
    expect(component.find('.c-breadcrumbs').exists()).toBe(true)
  })
  it('should label the breadcrumbs with the name supplied', () => {
    const mockProps = {
      list: [1, 2, 3],
    }
    const component = mount(<Breadcrumbs {...mockProps} />)
    expect(component.find('.c-breadcrumbs-link').first().text()).toContain(mockProps.list[0])
    expect(component.find('.c-breadcrumbs-link').last().text()).toContain(mockProps.list[mockProps.list.length - 1])
  })
  it('should link the breadcrumbs to the supplied items without spaces', () => {
    const mockProps = {
      list: ['test 1', 'test2', 'test3'],
    }
    const component = mount(<Breadcrumbs {...mockProps} />)
    expect(component.find('.c-breadcrumbs-link').first().prop('href')).toEqual(removeSpaces(mockProps.list[0]))
    expect(component.find('.c-breadcrumbs-link').last().prop('href')).toEqual(removeSpaces(mockProps.list[mockProps.list.length - 1]))
  })
  it('should not render any breadcrumbs if the list does not have more than 1 item', () => {
    let mockProps = {
      list: [],
    }
    let component = shallow(<Breadcrumbs {...mockProps} />)
    expect(component.find('.c-breadcrumbs-item')).toHaveLength(0)
    mockProps = {
      list: [1],
    }
    component = shallow(<Breadcrumbs {...mockProps} />)
    expect(component.find('.c-breadcrumbs-item')).toHaveLength(0)
  })
  it('should render the breadcrumbs when there is more than 1 list item', () => {
    const mockProps = {
      list: [1, 2, 3],
    }
    const component = shallow(<Breadcrumbs {...mockProps} />)
    expect(component.find('.c-breadcrumbs-item')).toHaveLength(3)
  })
})
