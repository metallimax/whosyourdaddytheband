import { gql } from '@apollo/client';

export default {
  backendUrl: 'http://localhost:4000/',
  graphql: {
    query: {
      CONCERTS: gql`
        query Concerts {
          concerts {
            id
            location_name
            date
          }
        }
      `,
    },
  }
};
