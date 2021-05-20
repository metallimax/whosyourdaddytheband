const { ApolloServer, gql } = require('apollo-server');

const { Wyd } = require('./datasources/wyd');

// // A schema is a collection of type definitions (hence "typeDefs")
// // that together define the "shape" of queries that are executed against
// // your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type GearType {
    name: String!
  }

  type Gear {
    name: String!
    type: GearType
  }

  type Role {
    name: String!
  }

  type Member {
    id: ID!
    firstname: String
    lastname: String
    fullname: String
    fullnameAka: String
    pseudo: String
    bio: String
    birth_date: String
    avatar: String
    member_from: String
    member_until: String
    roles: [Role]
    gears: [Gear]
    concerts: [Concert]
    records: [Record]
  }

  type Song {
    id: ID!
    title: String!
    duration: String
    lyrics: String
    authors: [Member]
    composers: [Member]
    records: [Record]
    concerts: [Concert]
    rank: Int
  }

  type Record {
    id: ID!
    title: String!
    type: String
    artwork: String
    recorded: String
    released: String
    songs: [Song]
    members: [Member]
  }

  type Concert {
    id: ID!
    title: String
    venue: String
    date: String
    poster: String
    members: [Member]
    bands: [String]
    songs: [Song]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    members: [Member]
    member(id: ID!): Member
    records: [Record]
    record(id: ID!): Record
    concerts: [Concert]
    concert(id: ID!): Concert
    songs: [Song]
    song(id: ID!): Song
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    members: async (_parent, _args, { dataSources: { wyd } }) => {

      return wyd.getMembers();
    },

    member: async (_parent, args, { dataSources: { wyd } }) => {

      return wyd.getMember(args.id);
    },

    records: async (_parent, _args, { dataSources: { wyd } }) => {

      return wyd.getRecords();
    },

    record: async (_parent, args, { dataSources: { wyd } }) => {

      return wyd.getRecord(args.id);
    },

    concerts: async (_parent, _args, { dataSources: { wyd } }) => {

      return wyd.getConcerts();
    },

    concert: async (_parent, args, { dataSources: { wyd } }) => {

      return wyd.getConcert(args.id);
    },

    songs: async (_parent, _args, { dataSources: { wyd } }) => {

      return wyd.getSongs();
    },

    song: async (_parent, args, { dataSources: { wyd } }) => {

      return wyd.getSong(args.id);
    },
  },

  Member: {
    fullname: async (parent, _args) => {

      return `${parent.firstname} ${parent.lastname}`;
    },

    fullnameAka: async (parent, _args) => {

      return `${parent.firstname} ${parent.lastname} a.k.a. "${parent.pseudo}"`;
    },

    roles: async (parent, _args, { dataSources: { wyd } }) => {

      return parent.roles.map((id) => wyd.getRole(id));
    },

    gears: async (parent, _args, { dataSources: { wyd } }) => {

      return wyd.getGearsByMember(parent.id);
    },

    concerts: async (parent, _args, { dataSources: { wyd } }) => {

      return wyd.getConcertsByMember(parent.id);
    },

    records: async (parent, _args, { dataSources: { wyd } }) => {

      return wyd.getRecordsByMember(parent.id);
    },
  },

  Gear: {
    type: async (parent, _args, { dataSources: { wyd } }) => {

      return wyd.getGearType(parent.type);
    },
  },

  Record: {
    songs: async (parent, _args, { dataSources: { wyd } }) => {

      return wyd.getSongsByRecord(parent.id);
    },
  },

  Concert: {
    songs: async (parent, _args, { dataSources: { wyd } }) => {

      return wyd.getSongsByConcert(parent.id);
    },

    members: async (parent, _args, { dataSources: { wyd } }) => {

      return parent.members.map((memberId) => wyd.getMember(memberId));
    },
  },

  Song: {
    authors: async (parent, _args, { dataSources: { wyd } }) => {

      return parent.authors.map((memberId) => wyd.getMember(memberId));
    },

    composers: async (parent, _args, { dataSources: { wyd } }) => {

      return parent.composers.map((memberId) => wyd.getMember(memberId));
    },

    records: async (parent, _args, { dataSources: { wyd } }) => {

      return wyd.getRecordsBySong(parent.id);
    },

    concerts: async (parent, _args, { dataSources: { wyd } }) => {

      return wyd.getConcertsBySong(parent.id);
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      wyd: new Wyd(),
    };
  },
  context: () => {
    return {
      token: 'foo',
    };
  },
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});