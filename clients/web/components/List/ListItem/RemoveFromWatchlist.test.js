import React from 'react'
import { shallow } from 'enzyme'
import RemoveFromWatchlist from './RemoveFromWatchlist'

describe('RemoveFromWatchlist Component', () => {
  it('should only render the Remove from Watchlist button for Movies or TV Shows on the watchlist', () => {
    let propsMock = {
      isInWatchList: true,
      type: 'Movie',
    }
    let component = shallow(<RemoveFromWatchlist {...propsMock} />)
    expect(component.find('.c-remove-from-watchlist-button').exists()).toBe(true)
    propsMock = {
      isInWatchList: true,
      type: 'TV',
    }
    component = shallow(<RemoveFromWatchlist {...propsMock} />)
    expect(component.find('.c-remove-from-watchlist-button').exists()).toBe(true)
    propsMock = {
      isInWatchList: true,
      type: 'Episode',
    }
    component = shallow(<RemoveFromWatchlist {...propsMock} />)
    expect(component.find('.c-remove-from-watchlist-button').exists()).toBe(false)
    propsMock = {
      isInWatchList: false,
      type: 'Movie',
    }
    component = shallow(<RemoveFromWatchlist {...propsMock} />)
    expect(component.find('.c-remove-from-watchlist-button').exists()).toBe(false)
  })

  it('should remove the item from the watchlist when the button is clicked', () => {
    const removeItemMock = jest.fn().mockResolvedValue()
    const propsMock = {
      isInWatchList: true,
      removeItem: removeItemMock,
      type: 'Movie',
    }
    const component = shallow(<RemoveFromWatchlist {...propsMock} />)
    const mockedEvent = { target: {}, preventDefault: () => {} }
    component.find('.c-remove-from-watchlist-button').simulate('click', mockedEvent)
    expect(removeItemMock.mock.calls).toHaveLength(1)
  })
})
