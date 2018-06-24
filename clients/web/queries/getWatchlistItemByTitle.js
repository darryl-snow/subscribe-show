import gql from 'graphql-tag'

export default gql`
  query watchListItemByTitle($title: String!) {
    watchListItemByTitle(title: $title) {
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
