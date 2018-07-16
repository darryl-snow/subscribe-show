import React from 'react'
import { mount, shallow } from 'enzyme'
import ListItemTitle from './ListItemTitle'

describe('ListItemTitle Component', () => {
  it('should render a link for TV show and Episode watchlist items only', () => {
    let mockProps = {
      tmdbID: '17861',
      type: 'TV',
      title: 'test',
      id: '1',
    }
    let component = shallow(<ListItemTitle {...mockProps} />)
    expect(component.find('.o-link').exists()).toBe(true)
    mockProps = {
      tmdbID: '17861',
      type: 'Movie',
      title: 'test',
    }
    component = shallow(<ListItemTitle {...mockProps} />)
    expect(component.find('.o-link').exists()).toBe(false)
    mockProps = {
      type: 'TV',
      title: 'test',
    }
    component = shallow(<ListItemTitle {...mockProps} />)
    expect(component.find('.o-link').exists()).toBe(false)
    mockProps = {
      type: 'Episode',
      title: 'test',
      id: '1',
      watchlistItem: {
        id: '1',
        title: 'test',
      },
    }
    component = shallow(<ListItemTitle {...mockProps} />)
    expect(component.find('.o-link').exists()).toBe(true)
  })
})
