import gql from 'graphql-tag'

export default gql`
  query watchListItem($id: ID!) {
    watchListItem(id: $id) {
      tmdbID
      title
      language
      description
      image
      type
      watched
      isInWatchList
      episodes {
        id
        name
        seasonNumber
        episodeNumber
        airDate
        description
        image
        watched
      }
    }
  }
`
