import gql from 'graphql-tag'

export default gql`
  {
    watchListItems {
      id
      type
      title
      description
      image
      language
      airDate
      watched
      tmdbID
    }
  }
`
