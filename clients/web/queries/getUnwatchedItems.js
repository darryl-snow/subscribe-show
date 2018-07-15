import gql from 'graphql-tag'

export default gql`
  {
    unwatchedItems {
      id
      type
      title
      description
      image
      language
      airDate
      watched
      episodes {
        id
        name
        seasonNumber
        episodeNumber
        description
        image
        airDate
        watched
      }
    }
  }
`
