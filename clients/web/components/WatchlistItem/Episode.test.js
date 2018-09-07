import React from 'react'
import { mount, shallow } from 'enzyme'
import { Episode } from './Episode'

describe('Episode Component', () => {
  it('should render', () => {
    const component = shallow(<Episode />)
    expect(component.find('.c-list-item').exists()).toBe(true)
  })
  it('should correctly format air dates', () => {
    const mockProps = {
      airDate: 'Sun Jun 4 2018 08:00:00 GMT+0800 (CST)',
    }
    const component = shallow(<Episode {...mockProps} />)
    expect(component.find('.o-label').text()).toEqual('2018-06-04')
  })
  it('should display correct episode information', () => {
    const testValue = 'test'
    const mockProps = {
      episodeNumber: 1,
      image: testValue,
      name: testValue,
      description: testValue,
    }
    const component = shallow(<Episode {...mockProps} />)
    expect(component.find('.c-list-item-episode-number').text()).toEqual('1')
    expect(component.find('.c-list-item-image').prop('style').backgroundImage).toEqual(`url(${testValue})`)
    expect(component.find('h3').text()).toEqual(testValue)
    expect(component.find('p').text()).toEqual(testValue)
  })
  it('should correctly indicate whether an episode has been watched', () => {
    let mockProps = {
      watched: true,
    }
    let component = mount(<Episode {...mockProps} />)
    expect(component.find('.c-toggle-watched-button').exists()).toBe(true)
    expect(component.find('.c-toggle-watched-button').contains('Mark as not watched')).toBe(true)
    expect(component.find('.c-toggle-watched-button').contains('Mark as watched')).toBe(false)
    expect(component.find('.fa-times').exists()).toBe(true)
    expect(component.find('.fa-check').exists()).toBe(false)
    mockProps = {
      watched: false,
    }
    component = mount(<Episode {...mockProps} />)
    expect(component.find('.c-toggle-watched-button').exists()).toBe(true)
    expect(component.find('.c-toggle-watched-button').contains('Mark as not watched')).toBe(false)
    expect(component.find('.c-toggle-watched-button').contains('Mark as watched')).toBe(true)
    expect(component.find('.fa-times').exists()).toBe(false)
    expect(component.find('.fa-check').exists()).toBe(true)
  })
  it('should toggle an episode as watched/unwatched when the button is clicked', () => {
    const mutateMock = jest.fn().mockResolvedValue()
    const mockProps = {
      analytics: {
        event: () => {},
      },
      mutate: mutateMock,
    }
    const component = shallow(<Episode {...mockProps} />)
    const mockedEvent = { target: {}, preventDefault: () => {} }
    component.find('.c-toggle-watched-button').simulate('click', mockedEvent)
    expect(mutateMock.mock.calls).toHaveLength(1)
  })
})
