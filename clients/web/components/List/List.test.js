import React from 'react'
import { shallow, mount } from 'enzyme'
import List from './List'

const listItemsMock = [{
  tmdbID: 1,
}, {
  tmdbID: 2,
}, {
  tmdbID: 3,
}]

describe('List Component', () => {
  it('should render', () => {
    const wrapper = shallow(<List />)
    expect(wrapper.find('.c-list').exists()).toBe(true)
  })
  it('should render the list items', () => {
    const wrapper = mount(<List listItems={listItemsMock} />)
    expect(wrapper.find('li').length).toEqual(listItemsMock.length)
  })
})
