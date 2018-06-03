import React from 'react'
import { shallow } from 'enzyme'
import Loader from './Loader'

describe('Loader Component', () => {
  it('should render', () => {
    expect(shallow(<Loader />).find('.o-loader').exists()).toBe(true)
  })
})
