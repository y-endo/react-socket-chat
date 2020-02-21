import * as React from 'react';
import io from 'socket.io-client';
import { StoreState } from '~/ts/store';

// 開発でExpressで動かしてるサーバだった場合
let socket: SocketIOClient.Socket | null = null;
if (location.port === '3030') {
  socket = io();
}

type Props = {
  chatRoom: StoreState['chatRoom'];
  setSocket: (value: SocketIOClient.Socket | null) => void;
};

const ChatRoom: React.FC<Props> = ({ chatRoom, setSocket }) => {
  const input = React.useRef<HTMLInputElement>(null);
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (input.current) {
      const value = input.current.value;

      if (value !== '') {
        if (chatRoom.socket) {
          chatRoom.socket.emit('message', value);
          input.current.value = '';
        }
      }
    }
  };

  React.useEffect(() => {
    if (chatRoom.socket) {
      chatRoom.socket.on('message', (message: string) => {
        console.log('message', message);
      });
    }
  });

  React.useEffect(() => {
    setSocket(socket);
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <input type="text" ref={input} />
    </form>
  );
};

export default ChatRoom;
