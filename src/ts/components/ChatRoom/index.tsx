import * as React from 'react';
import gql from 'graphql-tag';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import queryRoom from '~/graphql/queries/room.graphql';
import { StoreState } from '~/ts/store';
import { addMessages, clearMessages } from '~/ts/modules/ChatRoom';

import Input from './parts/Input';
import MessageList from './parts/MessageList';

type Props = {
  roomId: string;
};

const ChatRoom: React.FC<Props> = ({ roomId }) => {
  const messages = useSelector<StoreState, StoreState['chatRoom']['messages']>(state => state.chatRoom.messages);
  const socket = useSelector<StoreState, StoreState['app']['socket']>(state => state.app.socket);
  // const sessionId = useSelector<StoreState, StoreState['app']['sessionId']>(state => state.app.sessionId);
  const userName = useSelector<StoreState, StoreState['app']['userName']>(state => state.app.userName);
  const dispatch = useDispatch();
  const { data } = useQuery(
    gql`
      ${queryRoom}
    `,
    {
      variables: { id: roomId }
    }
  );

  const emitMessage = React.useCallback(
    (message: string, isBroadcast = false) => {
      if (socket) socket.emit(isBroadcast ? 'addMessageBroadcast' : 'addMessage', message);
    },
    [socket]
  );

  const addMessage = (message: string) => {
    dispatch(
      addMessages([
        {
          name: 'test',
          message,
          postedAt: '2020-10-10 10:10:10'
        }
      ])
    );
  };

  React.useEffect(() => {
    if (socket) {
      socket.on('addMessage', addMessage);
      socket.emit('join', roomId);
    }
    emitMessage(`${userName}が入室しました。`);

    return () => {
      emitMessage('退室しました。', true);
      if (socket) {
        socket.emit('leave', roomId);
        socket.off('addMessage');
      }
      dispatch(clearMessages());
    };
  }, []);

  return (
    <>
      {data && <h1>{data.room.name}</h1>}
      <MessageList messages={messages} />
      <Input emitMessage={emitMessage} />
    </>
  );
};

export default ChatRoom;
