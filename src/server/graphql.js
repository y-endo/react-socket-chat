const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');

const schema = fs.readFileSync(path.resolve(__dirname, '../graphql/schema.graphql'), 'utf-8').toString();

const DATABASE_URL = 'mongodb://localhost:27017';
const DATABASE_NAME = 'react-socket-chat';

mongoose.connect(`${DATABASE_URL}/${DATABASE_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const database = mongoose.connection;
database.on('error', console.error.bind(console, 'MongoDB 接続エラー'));
database.once('open', () => console.log('MongoDB 接続'));

const RoomModel = mongoose.model(
  'Room',
  new mongoose.Schema(
    {
      id: String,
      name: String,
      count: Number,
      createdAt: String
    },
    {
      collection: 'rooms'
    }
  )
);

const typeDefs = gql`
  ${schema}
`;
const resolvers = {
  Query: {
    async rooms() {
      const rooms = await RoomModel.find();

      return rooms;
    },
    async room(_, args) {
      const room = await RoomModel.findOne({ id: args.id });

      return room;
    }
  },
  Mutation: {
    async addRoom(_, args) {
      const room = new RoomModel(args);
      await room.save();

      return room;
    }
  }
};

module.exports = new ApolloServer({ typeDefs, resolvers });
