import React from 'react'
import { mount, shallow } from 'enzyme'
import ListItem from './ListItem'

describe('ListItem Component', () => {
  it('should render', () => {
    const component = shallow(<ListItem />)
    expect(component.find('.c-list-item').exists()).toBe(true)
    expect(component.find('.c-list-item-image').exists()).toBe(true)
    expect(component.find('.c-list-item-details').exists()).toBe(true)
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
    let mockProps = {
      title: `${mockValue}-title`,
      description: `${mockValue}-description`,
      language: `${mockValue}-language`,
      image: `${mockValue}-image`,
      type: `${mockValue}-type`,
      airDate: '2018-01-01',
    }
    let component = mount(<ListItem item={mockProps} />)
    const componentStyle = component.find('.c-list-item-image').prop('style')
    expect(componentStyle.backgroundImage).toEqual(`url(${mockValue}-image)`)
    expect(component.find('h2').contains(`${mockValue}-title`)).toEqual(true)
    expect(component.find('.fa-film').exists()).toBe(true)
    expect(component.find('.o-subheading').text()).toEqual('2018-01-01')
    expect(component.find('.o-label').text()).toEqual(`${mockValue}-language`)
    expect(component.find('p').text()).toEqual(`${mockValue}-description`)
    mockProps = {
      id: '1',
      title: `${mockValue}-title`,
      description: `${mockValue}-description`,
      language: `${mockValue}-language`,
      image: `${mockValue}-image`,
      type: 'Episode',
      seasonNumber: 1,
      episodeNumber: 1,
      airDate: '2018-01-01',
      watchlistItem: {
        id: '1',
        title: 'test',
      },
    }
    component = mount(<ListItem item={mockProps} />)
    expect(component.find('h2').contains('S01E01')).toEqual(true)
  })
})
