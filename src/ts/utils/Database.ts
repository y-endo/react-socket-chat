import mongoose from 'mongoose';

const DATABASE_URL = 'mongodb://localhost:27017';
const DATABASE_NAME = 'react-socket-chat';

mongoose.connect(`${DATABASE_URL}:${DATABASE_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export const database = mongoose.connection;

const messagesSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    text: String,
    postedAt: String
  },
  {
    collection: 'messages'
  }
);
export const MessagesModel = mongoose.models.Messages || mongoose.model('Messages', messagesSchema);

const roomsSchema = new mongoose.Schema({
  id: Number,
  name: String,
  count: Number,
  createdAt: String
});
export const RoomsModel = mongoose.models.Rooms || mongoose.model('Rooms', roomsSchema);
