import * as React from 'react';
import { StoreState } from '~/ts/store';
import io from 'socket.io-client';

import Input from './parts/Input';

type Props = {
  chatRoom: StoreState['chatRoom'];
  setSocket: (payload: SocketIOClient.Socket) => void;
  roomId: string;
};

const ChatRoom: React.FC<Props> = ({ chatRoom, setSocket, roomId }) => {
  const socket = React.useRef<SocketIOClient.Socket>(io());

  React.useEffect(() => {
    setSocket(socket.current);

    socket.current.on('message', (message: string) => {
      console.log(message);
    });
    socket.current.emit('join', roomId);
    socket.current.emit('message', '入室しました。');

    return () => {
      socket.current.emit('message', '退室しました。');
      socket.current.emit('leave', roomId);
    };
  }, []);

  return (
    <>
      <Input chatRoom={chatRoom} />
    </>
  );
};

export default ChatRoom;
