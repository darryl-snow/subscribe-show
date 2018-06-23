import gql from 'graphql-tag'

export default gql`
  mutation ToggleEpisodeWatched($id: ID!) {
    toggleEpisodeWatched(id: $id) {
      id
    }
  }
`
