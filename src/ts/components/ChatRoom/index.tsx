import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  const sessionId = useSelector<StoreState, StoreState['app']['sessionId']>(state => state.app.sessionId);
  const userName = useSelector<StoreState, StoreState['app']['userName']>(state => state.app.userName);
  const dispatch = useDispatch();

  const emitMessage = React.useCallback(
    (message: string, isBroadcast = false) => {
      if (socket) socket.emit(isBroadcast ? 'messageBroadcast' : 'message', message);
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
      socket.on('message', addMessage);
      socket.emit('join', roomId);
    }
    emitMessage(`${userName}が入室しました。`);

    return () => {
      emitMessage('退室しました。', true);
      if (socket) {
        socket.emit('leave', roomId);
        socket.off('message');
      }
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
