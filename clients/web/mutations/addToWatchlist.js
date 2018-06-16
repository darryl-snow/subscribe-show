import gql from 'graphql-tag'

export default gql`
  mutation AddItem($tmdbID: String!, $type: String!) {
    addItem(tmdbID: $tmdbID, type: $type) {
      id
      tmdbID
      title
      airDate
      description
      language
      image
      type
      watched
      episodes {
        tmdbEpisodeID
        seasonNumber
        episodeNumber
        airDate
        name
        description
        image
        watched
      }
    }
  }
`
