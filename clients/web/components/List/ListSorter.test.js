import React from 'react'
import { shallow } from 'enzyme'
import ListSorter from './ListSorter'

const updateListMock = jest.fn()

describe('ListSorter Component', () => {
  it('should render', () => {
    const wrapper = shallow(<ListSorter />)
    expect(wrapper.find('.c-list-sorter').exists()).toBe(true)
    expect(wrapper.find('.c-list-sort-order-select').exists()).toBe(true)
    expect(wrapper.find('option[value="airDate"]').exists()).toBe(true)
    expect(wrapper.find('option[value="title"]').exists()).toBe(true)
    expect(wrapper.find('.c-list-sort-order-button').exists()).toBe(true)
  })
  it('should change the sort field when the sort order selection is changed', () => {
    const mockSortField = 'test'
    const mockedEvent = {
      target: {
        value: mockSortField,
      },
      preventDefault: () => {},
    }
    const wrapper = shallow(<ListSorter updateList={updateListMock} />)
    wrapper.find('.c-list-sort-order-select').simulate('change', mockedEvent)
    expect(updateListMock.mock.calls.length).toBe(1)
    expect(updateListMock.mock.calls[0][0].sortBy).toEqual(mockSortField)
  })
  it('should change the sort order when the sort order toggle button is tapped', () => {
    const mockSortOrder = 1
    const mockedEvent = { preventDefault: () => {} }
    const wrapper = shallow(<ListSorter updateList={updateListMock} sortOrder={mockSortOrder} />)
    wrapper.find('.c-list-sort-order-button').simulate('click', mockedEvent)
    expect(updateListMock.mock.calls.length).toBe(2)
    expect(updateListMock.mock.calls[1][0].sortOrder).toEqual(mockSortOrder * -1)
  })
})
