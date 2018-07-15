import React from 'react'
import { mount, shallow } from 'enzyme'
import ListFilters from './ListFilters'

const updateListMock = jest.fn()
const resultsMock = [{
  language: 'l1',
  type: 'tv',
}, {
  language: 'l2',
  type: 'movie',
}, {
  language: 'l3',
  type: 'tv',
}]

// attach the .equals method to Array's prototype to call it on any array
const arrayContentsAreTheSame = (array1, array2) => {
  if (array1.length !== array2.length) {
    return false
  }
  for (let i = 0; i < array1.length; i += 1) {
    if (!array2.includes(array1[i])) {
      return false
    }
  }
  return true
}

describe('ListFilters Component', () => {
  it('should render', () => {
    const component = shallow(<ListFilters results={resultsMock} />)
    expect(component.find('.c-list-filters').exists()).toBe(true)
  })
  it('maintain active filters in state', () => {
    const component = mount(<ListFilters results={resultsMock} />)
    const filters = []
    resultsMock.forEach((result) => {
      filters.push(result.language)
      if (filters.indexOf(result.type) === -1) {
        filters.push(result.type)
      }
    })
    expect(arrayContentsAreTheSame(component.state().filters, filters)).toBe(true)
    component.instance().changeFilter(resultsMock[0].language, false)
    expect(arrayContentsAreTheSame(component.state().filters, filters)).toBe(false)
    filters.splice(filters.indexOf(resultsMock[0].language), 1)
    expect(arrayContentsAreTheSame(component.state().filters, filters)).toBe(true)
  })
  it('should render type filters', () => {
    const component = mount(<ListFilters results={resultsMock} />)
    resultsMock.forEach((result) => {
      expect(component.find(`.c-toggle-button input[value="${result.type}"]`).exists()).toBe(true)
    })
  })
  it('should render language filters', () => {
    const component = mount(<ListFilters results={resultsMock} />)
    resultsMock.forEach((result) => {
      expect(component.find(`.c-toggle-button input[value="${result.language}"]`).exists()).toBe(true)
    })
  })
  it('should update the list when a filter is toggled', () => {
    const component = mount(<ListFilters results={resultsMock} updateList={updateListMock} />)
    component.instance().changeFilter('test', false)
    expect(updateListMock.mock.calls.length).toBe(1)
  })
})
