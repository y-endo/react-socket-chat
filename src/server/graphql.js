const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');
const uuid = require('node-uuid');

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
      messages: [
        {
          name: String,
          text: String,
          postedAt: String
        }
      ],
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
      const room = new RoomModel({
        id: uuid.v4(),
        name: args.name,
        messages: [],
        createdAt: String(new Date())
      });
      await room.save();

      return room;
    },
    async addMessage(_, args) {
      const result = await RoomModel.updateOne(
        { id: args.roomId },
        {
          $push: {
            messages: {
              name: args.name,
              text: args.text,
              postedAt: String(new Date())
            }
          }
        }
      ).catch(error => {
        console.log(error);
        return false;
      });

      if (result === false) return false;
      return true;
    }
  }
};

module.exports = new ApolloServer({ typeDefs, resolvers });
