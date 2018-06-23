import React from 'react'
import { shallow } from 'enzyme'
import WatchlistItemHeader from './WatchlistItemHeader'

describe('WatchlistItemHeader Component', () => {
  it('should render', () => {
    const component = shallow(<WatchlistItemHeader />)
    expect(component.find('.c-watchlistitem-header').exists()).toBe(true)
    expect(component.find('.c-watchlistitem-header-content').exists()).toBe(true)
    expect(component.find('.c-watchlistitem-header-info').exists()).toBe(true)
    expect(component.find('.c-watchlistitem-header-meta').exists()).toBe(true)
  })
  it('should render the correct info', () => {
    const testValue = 'test'
    const propsMock = {
      description: testValue,
      image: testValue,
      language: testValue,
      title: testValue,
    }
    const component = shallow(<WatchlistItemHeader {...propsMock} />)
    expect(component.find('.c-watchlistitem-header').prop('style').backgroundImage).toEqual(`url(${testValue})`)
    expect(component.find('.c-watchlistitem-header-info h1').text()).toEqual(testValue)
    expect(component.find('.c-watchlistitem-header-info p').text()).toEqual(testValue)
    expect(component.find('.c-watchlistitem-header-meta .o-label').text()).toEqual(testValue)
  })
})
