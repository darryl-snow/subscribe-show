import React from 'react'
import { mount, shallow } from 'enzyme'
import ListContainer from './ListContainer'

const propsMock = {
  data: {
    test: [{
      tmdbID: 1,
      airDate: 'a',
      language: '5',
      title: '1',
      type: '3',
    }, {
      tmdbID: 2,
      airDate: 'y',
      language: '6',
      title: '2',
      type: '1',
    }, {
      tmdbID: 3,
      airDate: 'x',
      language: '7',
      title: '3',
      type: '2',
    }],
  },
  query: 'test',
}

const arraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false
  }
  for (let i = 0; i < arr1.length; i += 1) {
    if (arr1[i] !== arr2[i]) {
      return false
    }
  }
  return true
}

describe('ListContainer Component', () => {
  it('should render the component', () => {
    const testClass = 'test'
    const wrapper = mount(<ListContainer className={testClass} />)
    wrapper.setProps(propsMock)
    expect(wrapper.find(`.${testClass}`).exists()).toBe(true)
    expect(wrapper.find(`.${testClass}-header`).exists()).toBe(true)
    expect(wrapper.find(`.${testClass}-list`).exists()).toBe(true)
  })
  it('should only render a title if one has been provided', () => {
    let wrapper = mount(<ListContainer />)
    expect(wrapper.find('h1').exists()).toBe(false)
    const testTitle = 'test'
    wrapper = mount(<ListContainer title={testTitle} />)
    expect(wrapper.find('h1').exists()).toBe(true)
  })
  it('should pass on the list items provided, unfiltered', () => {
    const wrapper = mount(<ListContainer />)
    const listItems = propsMock.data[propsMock.query]
    wrapper.setProps(propsMock)
    expect(wrapper.find('.c-list-item')).toHaveLength(listItems.length)
  })
  it('should sort by airDate, ascending by default', () => {
    const wrapper = shallow(<ListContainer />)
    const listMock = propsMock.data[propsMock.query]
    wrapper.setState({ displayListItems: listMock })
    wrapper.instance().sortList()
    const providedListItems = listMock.map(item => item.airDate)
    const renderedListItems = wrapper.state().displayListItems.map(item => item.airDate)
    expect(arraysEqual(providedListItems.sort(), renderedListItems)).toBe(true)
  })
  it('should update the list controls', () => {
    const sortByTest = 'test'
    const sortOrderTest = -1
    const filterListMock = jest.fn()
    const sortListMock = jest.fn()
    const wrapper = shallow(<ListContainer />)

    wrapper.instance().filterList = filterListMock
    wrapper.instance().sortList = sortListMock
    wrapper.update()

    expect(wrapper.state().filters).toHaveLength(0)
    expect(filterListMock.mock.calls).toHaveLength(0)
    expect(sortListMock.mock.calls).toHaveLength(0)

    wrapper.instance().updateList({
      filters: ['1'],
    })
    expect(wrapper.state().filters).toHaveLength(1)
    expect(filterListMock.mock.calls).toHaveLength(1)

    wrapper.instance().updateList({
      sortBy: sortByTest,
    })
    expect(wrapper.state().sortBy).toBe(sortByTest)
    expect(sortListMock.mock.calls).toHaveLength(1)

    wrapper.instance().updateList({
      sortOrder: sortOrderTest,
    })
    expect(wrapper.state().sortOrder).toBe(sortOrderTest)
    expect(sortListMock.mock.calls).toHaveLength(2)
  })
  it('should sort the list according to the provided field', () => {
    const wrapper = shallow(<ListContainer />)
    const listMock = propsMock.data[propsMock.query]
    const sortByTest = 'type'
    wrapper.setState({
      displayListItems: listMock,
      sortBy: sortByTest,
    })
    wrapper.instance().sortList()
    const providedListItems = listMock.map(item => item[sortByTest])
    const renderedListItems = wrapper.state().displayListItems.map(item => item[sortByTest])
    expect(arraysEqual(providedListItems.sort(), renderedListItems)).toBe(true)
  })
  it('should sort the list in the specified order', () => {
    const wrapper = shallow(<ListContainer />)
    const listMock = propsMock.data[propsMock.query]
    const sortOrderTest = -1
    wrapper.setState({
      displayListItems: listMock,
      sortOrder: sortOrderTest,
    })
    wrapper.instance().sortList()
    const providedListItems = listMock.map(item => item.airDate)
    const renderedListItems = wrapper.state().displayListItems.map(item => item.airDate)
    expect(arraysEqual(providedListItems.sort().reverse(), renderedListItems)).toBe(true)
  })
  it('should filter the list according to the provided filters', () => {
    const wrapper = shallow(<ListContainer />)
    const listMock = propsMock.data[propsMock.query]
    const filterTest = [5]
    wrapper.setState({
      receivedListItems: listMock,
      filters: filterTest,
    })
    wrapper.instance().filterList()
    const filteredList =
      listMock.filter(item => filterTest.includes(item.language) && filterTest.includes(item.type))
    expect(wrapper.state().displayListItems).toHaveLength(filteredList.length)
  })
})
