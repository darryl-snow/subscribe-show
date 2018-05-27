import gql from 'graphql-tag';

export default gql`
  query SearchQuery($title: String!) {
    search(title: $title) {
      tmdbID
      title
      language
      description
      image
      type
      airDate
    }
  }
`;
