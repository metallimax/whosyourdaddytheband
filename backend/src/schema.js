const fs = require('fs');
const path = require('path');
// const { gql } = require('apollo-server');

const typeDefs = fs
  .readFileSync(
    process.env.GRAPHQL_SCHEMA || path.join(__dirname, 'schema.graphql')
  )
  .toString('utf-8')

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

module.exports = {
  typeDefs,
  resolvers,
}
