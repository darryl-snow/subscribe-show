import React from 'react'
import { mount, shallow } from 'enzyme'
import { ListContainer } from './ListContainer'

const propsMock = {
  data: {
    test: [{
      tmdbID: 1,
      airDate: '2017-01-01',
      language: '5',
      title: '1',
      type: '3',
    }, {
      tmdbID: 2,
      airDate: '2018-01-01',
      language: '6',
      title: '2',
      type: '1',
    }, {
      tmdbID: 3,
      airDate: '2016-01-01',
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
    const component = shallow(<ListContainer className={testClass} />)
    component.setProps(propsMock)
    expect(component.find(`.${testClass}`).exists()).toBe(true)
    expect(component.find(`.${testClass}-header`).exists()).toBe(true)
    expect(component.find(`.${testClass}-list`).exists()).toBe(true)
  })
  it('should render the empty list component if there are no list items', () => {
    const props = {
      data: {
        test: [],
      },
      query: 'test',
    }
    const component = mount(<ListContainer {...props} />)
    expect(component.find('.c-empty-list').exists()).toBe(true)
  })
  it('should only render a title if one has been provided', () => {
    let component = shallow(<ListContainer />)
    const listMock = propsMock.data[propsMock.query]
    component.setState({
      displayListItems: listMock,
      loading: false,
    })
    expect(component.find('h1').exists()).toBe(false)
    const testTitle = 'test'
    component = shallow(<ListContainer title={testTitle} />)
    component.setState({
      displayListItems: listMock,
      loading: false,
    })
    expect(component.find('h1').exists()).toBe(true)
  })
  it('should sort by airDate, ascending by default', () => {
    const component = shallow(<ListContainer />)
    const listMock = propsMock.data[propsMock.query]
    component.setState({ displayListItems: listMock })
    component.instance().sortList()
    const providedListItems = listMock.map(item => item.airDate)
    const renderedListItems = component.state().displayListItems.map(item => item.airDate)
    expect(arraysEqual(providedListItems.sort(), renderedListItems)).toBe(true)
  })
  it('should update the list controls', () => {
    const sortByTest = 'test'
    const sortOrderTest = -1
    const filterListMock = jest.fn()
    const sortListMock = jest.fn()
    const component = shallow(<ListContainer />)

    component.instance().filterList = filterListMock
    component.instance().sortList = sortListMock
    component.update()

    expect(component.state().filters).toHaveLength(0)
    expect(filterListMock.mock.calls).toHaveLength(0)
    expect(sortListMock.mock.calls).toHaveLength(0)

    component.instance().updateList({
      filters: ['1'],
    })
    expect(component.state().filters).toHaveLength(1)
    expect(filterListMock.mock.calls).toHaveLength(1)

    component.instance().updateList({
      sortBy: sortByTest,
    })
    expect(component.state().sortBy).toBe(sortByTest)
    expect(sortListMock.mock.calls).toHaveLength(1)

    component.instance().updateList({
      sortOrder: sortOrderTest,
    })
    expect(component.state().sortOrder).toBe(sortOrderTest)
    expect(sortListMock.mock.calls).toHaveLength(2)
  })
  it('should sort the list according to the provided field', () => {
    const component = shallow(<ListContainer />)
    const listMock = propsMock.data[propsMock.query]
    const sortByTest = 'type'
    component.setState({
      displayListItems: listMock,
      sortBy: sortByTest,
    })
    component.instance().sortList()
    const providedListItems = listMock.map(item => item[sortByTest])
    const renderedListItems = component.state().displayListItems.map(item => item[sortByTest])
    expect(arraysEqual(providedListItems.sort(), renderedListItems)).toBe(true)
  })
  it('should sort the list in the specified order', () => {
    const component = shallow(<ListContainer />)
    const listMock = propsMock.data[propsMock.query]
    const sortOrderTest = -1
    component.setState({
      displayListItems: listMock,
      sortOrder: sortOrderTest,
    })
    component.instance().sortList()
    const providedListItems = listMock.map(item => item.airDate)
    const renderedListItems = component.state().displayListItems.map(item => item.airDate)
    expect(arraysEqual(providedListItems.sort().reverse(), renderedListItems)).toBe(true)
  })
  it('should filter the list according to the provided filters', () => {
    const component = shallow(<ListContainer />)
    const listMock = propsMock.data[propsMock.query]
    const filterTest = [5]
    component.setState({
      receivedListItems: listMock,
      filters: filterTest,
    })
    component.instance().filterList()
    const filteredList =
      listMock.filter(item => filterTest.includes(item.language) && filterTest.includes(item.type))
    expect(component.state().displayListItems).toHaveLength(filteredList.length)
  })
})
