import React from 'react'
import { shallow } from 'enzyme'
import ListFilters from './ListFilters'

const updateListMock = jest.fn()
const resultsMock = [{
  language: 'l1',
  type: 't1'
},{
  language: 'l2',
  type: 't2'
},{
  language: 'l3',
  type: 't3'
}]

// attach the .equals method to Array's prototype to call it on any array
const arrayContentsAreTheSame = (array1, array2) => {
  if(array1.length !== array2.length) {
    return false
  }
  for(let i = 0; i < array1.length; i = i + 1) {
    if(!array2.includes(array1[i])) {
      return false
    }
  }
  return true
}

describe('ListFilters Component', () => {
  it('should render', () => {
    const wrapper = shallow(<ListFilters results={resultsMock} />)
    expect(wrapper.find('.c-list-filters').exists()).toBe(true)
  })
  it('maintain active filters in state', () => {
    const wrapper = mount(<ListFilters results={resultsMock} />)
    const filters = []
    resultsMock.forEach((result) => {
      filters.push(result.language)
      filters.push(result.type)
    })
    expect(arrayContentsAreTheSame(wrapper.state().filters, filters)).toBe(true)
    wrapper.instance().changeFilter(resultsMock[0].language, false)
    expect(arrayContentsAreTheSame(wrapper.state().filters, filters)).toBe(false)
    filters.splice(filters.indexOf(resultsMock[0].language), 1)
    expect(arrayContentsAreTheSame(wrapper.state().filters, filters)).toBe(true)
  })
  it('render type filters', () => {
    const wrapper = mount(<ListFilters results={resultsMock} />)
    resultsMock.forEach((result) => {
      expect(wrapper.find(`.c-toggle-button input[value="${result.type}"]`).exists()).toBe(true)
    })
  })
  it('render language filters', () => {
    const wrapper = mount(<ListFilters results={resultsMock} />)
    resultsMock.forEach((result) => {
      expect(wrapper.find(`.c-toggle-button input[value="${result.language}"]`).exists()).toBe(true)
    })
  })
  it('should update the list when a filter is toggled', () => {
    const wrapper = mount(<ListFilters results={resultsMock} updateList={updateListMock} />)
    wrapper.instance().changeFilter('test', false)
    expect(updateListMock.mock.calls.length).toBe(1)
  })
})
