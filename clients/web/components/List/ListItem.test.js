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
    }
    component = mount(<ListItem item={mockProps} />)
    expect(component.find('.o-button').exists()).toBe(true)
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
    const mutationMock = jest.fn().mockResolvedValue()
    const mockProps = {
      history: historyMock,
      item: {
        tmdbID: 'tmdbID',
      },
      mutate: mutationMock,
    }
    const component = shallow(<ListItem {...mockProps} />)
    const mockedEvent = { target: {}, preventDefault: () => {} }
    component.find('.o-button').simulate('click', mockedEvent)
    expect(mutationMock.mock.calls).toHaveLength(1)
  })
  it('should trigger the loading animation while adding an item to the watchlist', () => {
  })
  it('should only render a language label if the item has a language', () => {
    let component = shallow(<ListItem />)
    expect(component.find('.o-label').exists()).toBe(false)

    const mockProps = {
      language: 'language',
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
})
