import React from 'react'
import { shallow } from 'enzyme'
import AddToWatchlist from './AddToWatchlist'

describe('AddToWatchlist Component', () => {
  it('should only render the Add to Watchlist button for search result items', () => {
    let component = shallow(<AddToWatchlist />)
    expect(component.find('.c-add-to-watchlist-button').exists()).toBe(false)

    const mockProps = {
      isInWatchList: true,
    }
    component = shallow(<AddToWatchlist {...mockProps} />)
    expect(component.find('.c-add-to-watchlist-button').exists()).toBe(true)
  })

  it('should render a disabled Add to Watchlist button if the item is already in the watchlist', () => {
    const mockProps = {
      isInWatchList: true,
    }
    const component = shallow(<AddToWatchlist {...mockProps} />)
    expect(component.find('.c-add-to-watchlist-button.o-button--disabled').exists()).toBe(true)
  })

  it('should disable the Add to Watchlist button if the item is a search result and is already in the list', () => {
    const addItemMock = jest.fn().mockResolvedValue()
    const mockProps = {
      addItem: addItemMock,
      isInWatchList: true,
    }
    const component = shallow(<AddToWatchlist {...mockProps} />)
    const mockedEvent = { target: {}, preventDefault: () => {} }
    component.find('.c-add-to-watchlist-button').simulate('click', mockedEvent)
    expect(addItemMock.mock.calls).toHaveLength(0)
  })

  it('should add the item to the watchlist when the button is clicked', () => {
    const addItemMock = jest.fn()
    const mockProps = {
      addItem: addItemMock,
      isInWatchList: false,
    }
    const component = shallow(<AddToWatchlist {...mockProps} />)
    const mockedEvent = { target: {}, preventDefault: () => {} }
    component.find('.c-add-to-watchlist-button').simulate('click', mockedEvent)
    expect(addItemMock.mock.calls).toHaveLength(1)
  })
})
