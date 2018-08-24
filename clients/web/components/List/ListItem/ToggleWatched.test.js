import React from 'react'
import { mount, shallow } from 'enzyme'
import ToggleWatched from './ToggleWatched'

describe('ToggleWatched Component', () => {
  it('should only render the Toggle Watched button for watchlist items', () => {
    let propsMock = {
      id: '1',
      type: 'Movie',
      watched: false,
    }
    let component = shallow(<ToggleWatched {...propsMock} />)
    expect(component.find('.c-toggle-watched-button').exists()).toBe(true)
    propsMock = {
      type: 'Movie',
      watched: false,
    }
    component = shallow(<ToggleWatched {...propsMock} />)
    expect(component.find('.c-toggle-watched-button').exists()).toBe(false)
  })

  it('should render the Toggle Watched button based on the prop', () => {
    let propsMock = {
      id: '1',
      type: 'Movie',
      watched: false,
    }
    let component = mount(<ToggleWatched {...propsMock} />)
    expect(component.find('.c-toggle-watched-button').exists()).toBe(true)
    expect(component.find('.fa-eye').exists()).toBe(true)
    expect(component.find('.fa-check').exists()).toBe(false)
    propsMock = {
      id: '1',
      type: 'Movie',
      watched: true,
    }
    component = mount(<ToggleWatched {...propsMock} />)
    expect(component.find('.c-toggle-watched-button').exists()).toBe(true)
    expect(component.find('.fa-eye').exists()).toBe(false)
    expect(component.find('.fa-check').exists()).toBe(true)
  })

  it('should always disable the Toggle Watched button for TV Shows', () => {
    let propsMock = {
      id: '1',
      type: 'Movie',
      watched: true,
    }
    let component = shallow(<ToggleWatched {...propsMock} />)
    expect(component.find('.c-toggle-watched-button.o-button--disabled').exists()).toBe(false)
    propsMock = {
      id: '1',
      type: 'TV',
      watched: true,
    }
    component = shallow(<ToggleWatched {...propsMock} />)
    expect(component.find('.c-toggle-watched-button.o-button--disabled').exists()).toBe(true)
    propsMock = {
      id: '1',
      type: 'Episode',
      watched: true,
    }
    component = shallow(<ToggleWatched {...propsMock} />)
    expect(component.find('.c-toggle-watched-button.o-button--disabled').exists()).toBe(false)
  })

  it('should toggle an item as watched or unwatched when the toggle watched button is clicked', () => {
    const toggleItemWatchedMock = jest.fn()
    const propsMock = {
      id: '1',
      toggleItemWatched: toggleItemWatchedMock,
      type: 'Movie',
      watched: false,
    }
    const component = shallow(<ToggleWatched {...propsMock} />)
    const mockedEvent = { target: {}, preventDefault: () => {} }
    component.find('.c-toggle-watched-button').simulate('click', mockedEvent)
    expect(toggleItemWatchedMock.mock.calls).toHaveLength(1)
  })

  it('should toggle an episode as watched or unwatched when the toggle watched button is clicked', () => {
    const toggleEpisodeWatchedMock = jest.fn()
    const propsMock = {
      id: '1',
      toggleEpisodeWatched: toggleEpisodeWatchedMock,
      type: 'Episode',
      watched: false,
    }
    const component = shallow(<ToggleWatched {...propsMock} />)
    const mockedEvent = { target: {}, preventDefault: () => {} }
    component.find('.c-toggle-watched-button').simulate('click', mockedEvent)
    expect(toggleEpisodeWatchedMock.mock.calls).toHaveLength(1)
  })
})
