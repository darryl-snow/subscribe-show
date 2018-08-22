import React from 'react'
import { shallow } from 'enzyme'
import ListSorter from './ListSorter'

const updateListMock = jest.fn()

describe('ListSorter Component', () => {
  it('should render', () => {
    const component = shallow(<ListSorter />)
    expect(component.find('.c-list-sorter').exists()).toBe(true)
  })
  it('should change the sort field when the sort order selection is changed', () => {
    const mockSortField = 'test'
    const mockedEvent = {
      target: {
        value: mockSortField,
      },
      preventDefault: () => {},
    }
    const component = shallow(<ListSorter updateList={updateListMock} />)
    component.find('select').first().simulate('change', mockedEvent)
    expect(updateListMock.mock.calls.length).toBe(1)
    expect(updateListMock.mock.calls[0][0].sortBy).toEqual(mockSortField)
  })
  it('should change the sort order when the sort order toggle button is tapped', () => {
    const mockSortOrder = 1
    const mockedEvent = { preventDefault: () => {} }
    const component = shallow(<ListSorter updateList={updateListMock} sortOrder={mockSortOrder} />)
    component.find('select').last().simulate('change', mockedEvent)
    expect(updateListMock.mock.calls.length).toBe(2)
    expect(updateListMock.mock.calls[1][0].sortOrder).toEqual(mockSortOrder * -1)
  })
})
