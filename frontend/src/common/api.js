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
              birth_date
              roles {
                name
              }
            }
            bands
            songs {
              id
              title
              rank
            }
          }
        }
      `,
      SONGS: gql`
        query Songs {
          songs {
            id
            title
          }
        }
      `,
      SONG: gql`
        query Song($id: ID!) {
          song(id: $id) {
            id
            title
            duration
            lyrics
            authors {
              id
              fullname
            }
            composers {
              id
              fullname
            }
          }
        }
      `,
      MEMBERS: gql`
        query Members {
          members {
            id
            fullname
          }
        }
      `,
      MEMBER: gql`
        query Member($id: ID!) {
          member(id: $id) {
            id
            firstname
            lastname
            fullname
            fullnameAka
            pseudo
            birth_date
            avatar
            member_from
            member_until
            roles {
              name
            }
            gears {
              name
              type {
                name
              }
            }
          }
        }
      `,
    },
  },
};
