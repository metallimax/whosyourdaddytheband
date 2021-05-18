import { gql } from '@apollo/client';

export default {
  backendUrl: 'http://localhost:4000/',
  graphql: {
    query: {
      CONCERTS: gql`
        query Concerts {
          concerts {
            id
            title
            date
          }
        }
      `,
      CONCERT: gql`
        query Concert($id: ID!) {
          concert(id: $id) {
            id
            title
            venue
            date
            members {
              pseudo
            }
            bands
            songs {
              title
              rank
            }
          }
        }
    `,
    },
  },
};
