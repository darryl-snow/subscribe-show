import gql from 'graphql-tag'

export default gql`
  mutation removeItem($id: String!) {
    removeItem(id: $id) {
      id
    }
  }
`
