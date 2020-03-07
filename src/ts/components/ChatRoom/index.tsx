import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { StoreState } from '~/ts/store';
import { addMessages, clearMessages } from '~/ts/modules/ChatRoom';

import Input from './parts/Input';
import MessageList from './parts/MessageList';

type Props = {
  roomId: string;
};

const ChatRoom: React.FC<Props> = ({ roomId }) => {
  const socket = React.useRef<SocketIOClient.Socket>(io());
  const messages = useSelector<StoreState, StoreState['chatRoom']['messages']>(state => state.chatRoom.messages);
  const sessionId = useSelector<StoreState, StoreState['app']['sessionId']>(state => state.app.sessionId);
  const userName = useSelector<StoreState, StoreState['app']['userName']>(state => state.app.userName);
  const dispatch = useDispatch();

  const emitMessage = React.useCallback(
    (message: string, isBroadcast = false) => {
      socket.current.emit(isBroadcast ? 'messageBroadcast' : 'message', message);
    },
    [socket]
  );

  const addMessage = (message: string) => {
    dispatch(
      addMessages([
        {
          name: 'test',
          message,
          date: '2020-03-06 11:10:00'
        }
      ])
    );
  };

  React.useEffect(() => {
    socket.current.on('message', addMessage);
    socket.current.emit('join', roomId);
    emitMessage(`${userName}が入室しました。`);

    return () => {
      emitMessage('退室しました。', true);
      socket.current.emit('leave', roomId);
      dispatch(clearMessages());
    };
  }, []);

  return (
    <>
      <MessageList messages={messages} />
      <Input emitMessage={emitMessage} />
    </>
  );
};

export default ChatRoom;
