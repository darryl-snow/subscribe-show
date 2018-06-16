import gql from 'graphql-tag'

export default gql`
  mutation ToggleWatched($id: ID!) {
    toggleItemWatched(id: $id) {
      id
    }
  }
`
