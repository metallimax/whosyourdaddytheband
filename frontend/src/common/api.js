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
              id
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
              duration
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
            records {
              title
              artwork
            }
            concerts {
              id
              title
              date
              poster
            }
          }
        }
      `,
      MEMBERS: gql`
        query Members {
          members {
            id
            fullname
            pseudo
            birth_date
            member_until
            avatar
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
            bio
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
            concerts {
              id
              title
              date
            }
            records {
              id
              title
              recorded
            }
          }
        }
      `,
      RECORDS: gql`
        query Records {
          records {
            id
            title
            type
            released
            artwork
          }
        }
      `,
      RECORD: gql`
        query Record($id: ID!) {
          record(id: $id) {
            id
            title
            type
            released
            artwork
            songs {
              id
              title
              duration
              rank
            }
          }
        }
      `,
    },
  },
};
