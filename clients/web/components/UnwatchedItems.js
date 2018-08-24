// Dependencies
import React from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import query from '../queries/getUnwatchedItems'

const sortList = (list) => {
  const dynamicSort = property => (a, b) => {
    const c = (a[property] > b[property]) ? 1 : 0
    const d = (a[property] < b[property]) ? -1 : c
    return d * -1
  }
  const tmp = list.slice()
  tmp.sort(dynamicSort('airDate'))
  return tmp
}

const parseItems = (items) => {
  let listItems = []

  if (!items) {
    return listItems
  }

  for (let i = 0; i < items.length; i += 1) {
    if (items[i].type.toLowerCase() === 'movie') {
      listItems.push(items[i])
    } else {
      const episodes = []
      for (let j = 0; j < items[i].episodes.length; j += 1) {
        const episode = items[i].episodes[j]
        if (!episode.watched) {
          const unwatchedEpisode = Object.assign({}, episode)
          unwatchedEpisode.language = items[i].language
          unwatchedEpisode.title = unwatchedEpisode.name
          unwatchedEpisode.type = 'Episode'
          unwatchedEpisode.watchlistItem = {
            id: items[i].id,
            title: items[i].title,
          }
          episodes.push(unwatchedEpisode)
        }
      }
      listItems = listItems.concat(episodes)
    }
  }

  return sortList(listItems)
}

/**
 * The UnwatchedItems component is a higher-order component that simply passes
 * data into a ListContainer component.
 */
export default (PassedComponent) => {
  const UnwatchedItems = (props) => {
    const listItems = parseItems(props.data.unwatchedItems)
    return (
      <PassedComponent
        className="c-unwatched-items"
        listItems={listItems}
        sortBy="airDate"
        sortOrder={-1}
        query="unwatchedItems"
        {...props}
      />
    )
  }

  /**
   * Define the property types.
   * @type {Object}
   */
  UnwatchedItems.propTypes = {
    data: PropTypes.object,
  }

  /**
   * Set the default values for each property.
   * @type {Object}
   */
  UnwatchedItems.defaultProps = {
    data: {},
  }

  // Append results of the graphQL query to the component properties.
  return graphql(query, {
    options: {
      fetchPolicy: 'network-only',
    },
  })(UnwatchedItems)
}
