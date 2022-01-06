const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const { typeDefs, resolvers } = require('./schema')
const { Wyd } = require('./datasources/wyd');

const app = express();

const PORT = process.env.PORT || 4000;

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

server.applyMiddleware({ app })

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
