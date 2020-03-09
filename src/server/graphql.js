const fs = require('fs');
const path = require('path');
const { ApolloServer, gql } = require('apollo-server-express');

const schema = fs.readFileSync(path.resolve(__dirname, '../graphql/schema.graphql'), 'utf-8').toString();

const typeDefs = gql`
  ${schema}
`;
const resolvers = {
  Query: {
    rooms: () => {
      return [
        {
          id: 1,
          name: 'room1',
          count: 0,
          createdAt: '2020-03-09 10:00:00'
        }
      ];
    }
  }
};

module.exports = new ApolloServer({ typeDefs, resolvers });
