import React from 'react'
import { mount, shallow } from 'enzyme'
import { ListItem } from './ListItem'

describe('ListItem Component', () => {
  it('should render', () => {
    const component = shallow(<ListItem />)
    expect(component.find('.c-list-item').exists()).toBe(true)
    expect(component.find('.c-list-item-image').exists()).toBe(true)
    expect(component.find('.c-list-item-details').exists()).toBe(true)
  })

  it('should only render the Add to Watchlist button for search result items', () => {
    let component = shallow(<ListItem />)
    expect(component.find('.o-button').exists()).toBe(false)

    const mockProps = {
      tmdbID: 'tmdbID',
      isInWatchList: false,
      title: 'test',
    }
    component = mount(<ListItem item={mockProps} />)
    expect(component.find('.o-button').exists()).toBe(true)
  })

  it('should render a disabled button if the item is already in the watchlist', () => {
    const addItemMock = jest.fn().mockResolvedValue()
    const mockProps = {
      isInWatchList: true,
      addItem: addItemMock,
      item: {
        tmdbID: 'tmdbID',
        title: 'test',
      },
    }
    const component = mount(<ListItem item={mockProps} />)
    expect(component.find('.o-button--disabled').exists()).toBe(true)
    const mockedEvent = { target: {}, preventDefault: () => {} }
    component.find('.o-button').simulate('click', mockedEvent)
    expect(addItemMock.mock.calls).toHaveLength(0)
  })

  it('should add the item to the watchlist when the button is clicked', () => {
    const historyMock = {
      push: jest.fn(),
      location: {
        state: {
          query: '',
        },
      },
    }
    const addItemMock = jest.fn().mockResolvedValue()
    const mockProps = {
      addItem: addItemMock,
      history: historyMock,
      item: {
        tmdbID: 'tmdbID',
        isInWatchList: false,
        title: 'test',
      },
    }
    const component = shallow(<ListItem {...mockProps} />)
    const mockedEvent = { target: {}, preventDefault: () => {} }
    component.find('.o-button').simulate('click', mockedEvent)
    expect(addItemMock.mock.calls).toHaveLength(1)
  })

  it('should disable the add to watchlist button if the item is a search result and is already in the list', () => {
    const historyMock = {
      push: jest.fn(),
      location: {
        state: {
          query: '',
        },
      },
    }
    const addItemMock = jest.fn().mockResolvedValue()
    const mockProps = {
      addItem: addItemMock,
      history: historyMock,
      item: {
        tmdbID: 'tmdbID',
        isInWatchList: true,
        title: 'test',
      },
    }
    const component = shallow(<ListItem {...mockProps} />)
    const mockedEvent = { target: {}, preventDefault: () => {} }
    component.find('.o-button').simulate('click', mockedEvent)
    expect(addItemMock.mock.calls).toHaveLength(0)
  })

  it('should trigger the loading animation while adding an item to the watchlist', () => {
    const historyMock = {
      push: jest.fn(),
      location: {
        state: {
          query: '',
        },
      },
    }
    const addItemMock = jest.fn().mockResolvedValue()
    const toggleLoadingMock = jest.fn()
    const mockProps = {
      addItem: addItemMock,
      history: historyMock,
      item: {
        tmdbID: 'tmdbID',
        isInWatchList: false,
        title: 'test',
      },
      toggleLoading: toggleLoadingMock,
    }
    const component = shallow(<ListItem {...mockProps} />)
    const mockedEvent = { target: {}, preventDefault: () => {} }
    component.find('.o-button').simulate('click', mockedEvent)
    expect(toggleLoadingMock.mock.calls).toHaveLength(1)
  })

  it('should only render the toggle watched button for watchlist items', () => {
    let itemMock = {
      id: 1,
      type: 'Movie',
      title: 'test',
    }
    let component = shallow(<ListItem item={itemMock} />)
    expect(component.find('.o-button').exists()).toBe(true)
    itemMock = {
      type: 'Movie',
      title: 'test',
    }
    component = shallow(<ListItem item={itemMock} />)
    expect(component.find('.o-button').exists()).toBe(false)
  })

  it('should render the toggle watched button based on the state', () => {
    const itemMock = {
      id: 1,
      type: 'Movie',
      watched: false,
      title: 'test',
    }
    const component = mount(<ListItem item={itemMock} />)
    expect(component.find('.o-button').exists()).toBe(true)
    expect(component.find('.fa-eye').exists()).toBe(true)
    expect(component.find('.fa-check').exists()).toBe(false)
    component.setState({
      id: 1,
      type: 'Movie',
      watched: true,
      title: 'test',
    })
    component.update()
    expect(component.find('.o-button').exists()).toBe(true)
    expect(component.find('.fa-eye').exists()).toBe(false)
    expect(component.find('.fa-check').exists()).toBe(true)
  })

  it('should always disable the toggle watched button for TV Shows', () => {
    let itemMock = {
      id: 1,
      type: 'Movie',
      title: 'test',
    }
    let component = shallow(<ListItem item={itemMock} />)
    expect(component.find('.o-button--disabled').exists()).toBe(false)
    itemMock = {
      id: 1,
      type: 'TV',
      title: 'test',
    }
    component = shallow(<ListItem item={itemMock} />)
    expect(component.find('.o-button--disabled').exists()).toBe(true)
  })

  it('should toggle an item as watched or unwatched when the toggle watched button is clicked', () => {
    const toggleWatchedMock = jest.fn()
    const itemMock = {
      id: 1,
      type: 'Movie',
      title: 'test',
    }
    const component = shallow(<ListItem item={itemMock} toggleWatched={toggleWatchedMock} />)
    const mockedEvent = { target: {}, preventDefault: () => {} }
    component.find('.o-button').simulate('click', mockedEvent)
    expect(toggleWatchedMock.mock.calls).toHaveLength(1)
  })

  it('should only render a language label if the item has a language', () => {
    let component = shallow(<ListItem />)
    expect(component.find('.o-label').exists()).toBe(false)

    const mockProps = {
      language: 'language',
      title: 'test',
    }
    component = shallow(<ListItem item={mockProps} />)
    expect(component.find('.o-label').exists()).toBe(true)
  })

  it('should render the correct details', () => {
    const mockValue = 'test'
    const mockProps = {
      title: `${mockValue}-title`,
      description: `${mockValue}-description`,
      language: `${mockValue}-language`,
      image: `${mockValue}-image`,
      type: `${mockValue}-type`,
      airDate: `${mockValue}-airDate`,
    }
    const component = mount(<ListItem item={mockProps} />)
    const componentStyle = component.find('.c-list-item-image').prop('style')
    expect(componentStyle.backgroundImage).toEqual(`url(${mockValue}-image)`)
    expect(component.find('h2').contains(`${mockValue}-title`)).toEqual(true)
    expect(component.find(`.fa-${mockValue}-type`).exists()).toBe(true)
    expect(component.find('.o-subheading').text()).toEqual(`${mockValue}-airDate`)
    expect(component.find('.o-label').text()).toEqual(`${mockValue}-language`)
    expect(component.find('p').text()).toEqual(`${mockValue}-description`)
  })

  it('should render a link for TV show watch list items only', () => {
    let mockProps = {
      tmdbID: '17861',
      type: 'TV',
      title: 'test',
    }
    let component = shallow(<ListItem item={mockProps} />)
    expect(component.find('.o-link').exists()).toBe(true)
    mockProps = {
      tmdbID: '17861',
      type: 'Movie',
      title: 'test',
    }
    component = shallow(<ListItem item={mockProps} />)
    expect(component.find('.o-link').exists()).toBe(false)
    mockProps = {
      type: 'TV',
      title: 'test',
    }
    component = shallow(<ListItem item={mockProps} />)
    expect(component.find('.o-link').exists()).toBe(false)
  })
})
