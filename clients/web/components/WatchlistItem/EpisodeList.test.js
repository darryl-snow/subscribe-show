import React from 'react'
import { shallow } from 'enzyme'
import EpisodeList from './EpisodeList'

describe('EpisodeList Component', () => {
  it('should render', () => {
    const component = shallow(<EpisodeList />)
    expect(component.find('.c-episodelist').exists()).toBe(true)
  })
  it('should render the correct number of seasons', () => {
    const mockProps = {
      episodes: [
        {
          id: 1,
          episodeNumber: 1,
          seasonNumber: 1,
        },
        {
          id: 2,
          episodeNumber: 1,
          seasonNumber: 2,
        },
      ],
    }
    const component = shallow(<EpisodeList {...mockProps} />)
    expect(component.state().seasons).toHaveLength(2)
    expect(component.find('.c-episodelist-season')).toHaveLength(2)
  })
  it('should render breadcrumb navigation when there is more than 1 season', () => {
    let mockProps = {
      episodes: [
        {
          id: 1,
          episodeNumber: 1,
          seasonNumber: 1,
        },
        {
          id: 2,
          episodeNumber: 1,
          seasonNumber: 2,
        },
      ],
    }
    let component = shallow(<EpisodeList {...mockProps} />)
    expect(component.find('.c-breadcrumbs-item')).toHaveLength(2)
    mockProps = {
      episodes: [
        {
          id: 1,
          episodeNumber: 1,
          seasonNumber: 1,
        },
      ],
    }
    component = shallow(<EpisodeList {...mockProps} />)
    expect(component.find('.c-breadcrumbs-item')).toHaveLength(0)
  })
  it('should render the correct number of episodes for each season', () => {
    const mockProps = {
      episodes: [
        {
          id: 1,
          episodeNumber: 1,
          seasonNumber: 1,
        },
        {
          id: 2,
          episodeNumber: 2,
          seasonNumber: 1,
        },
        {
          id: 3,
          episodeNumber: 1,
          seasonNumber: 2,
        },
      ],
    }
    const component = shallow(<EpisodeList {...mockProps} />)
    expect(component.find('.c-episodelist-season')).toHaveLength(2)
    expect(component.find('.c-episodelist-season ol').children()).toHaveLength(3)
  })
})
