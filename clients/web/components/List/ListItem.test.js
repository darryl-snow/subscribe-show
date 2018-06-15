import React from 'react'
import { mount, shallow } from 'enzyme'
import ListItem from './ListItem'

describe('ListItem Component', () => {
  it('should render', () => {
    const wrapper = shallow(<ListItem />)
    expect(wrapper.find('.c-list-item').exists()).toBe(true)
    expect(wrapper.find('.c-list-item-image').exists()).toBe(true)
    expect(wrapper.find('.c-list-item-details').exists()).toBe(true)
  })
  it('should only render the Add to Watchlist button for search result items', () => {
    let wrapper = shallow(<ListItem />)
    expect(wrapper.find('.o-button').exists()).toBe(false)

    const mockProps = {
      tmdbID: 'tmdbID',
    }
    wrapper = mount(<ListItem item={mockProps} />)
    expect(wrapper.find('.o-button').exists()).toBe(true)
  })
  it('should only render a language label if the item has a language', () => {
    let wrapper = shallow(<ListItem />)
    expect(wrapper.find('.o-label').exists()).toBe(false)

    const mockProps = {
      language: 'language',
    }
    wrapper = mount(<ListItem item={mockProps} />)
    expect(wrapper.find('.o-label').exists()).toBe(true)
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
    const wrapper = mount(<ListItem item={mockProps} />)
    const wrapperStyle = wrapper.find('.c-list-item-image').prop('style')
    expect(wrapperStyle.backgroundImage).toEqual(`url(${mockValue}-image)`)
    expect(wrapper.find('h2').contains(`${mockValue}-title`)).toEqual(true)
    expect(wrapper.find(`.fa-${mockValue}-type`).exists()).toBe(true)
    expect(wrapper.find('.o-subheading').text()).toEqual(`${mockValue}-airDate`)
    expect(wrapper.find('.o-label').text()).toEqual(`${mockValue}-language`)
    expect(wrapper.find('p').text()).toEqual(`${mockValue}-description`)
  })
})
