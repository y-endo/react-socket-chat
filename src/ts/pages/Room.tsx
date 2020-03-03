import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import io from 'socket.io-client';

type Props = {} & RouteComponentProps<{ id: string }>;

const Room: React.FC<Props> = ({ match }) => {
  const input = React.useRef<HTMLInputElement>(null);
  const socket = React.useRef<SocketIOClient.Socket>(io());

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (input.current) {
      const value = input.current.value;

      socket.current.emit('message', value);
    }
  };

  React.useEffect(() => {
    socket.current.emit('join', parseInt(match.params.id, 10));
    socket.current.on('message', (message: string) => {
      console.log(message);
    });
  }, []);

  return (
    <div>
      <h1>Room {match.params.id}</h1>
      <form onSubmit={onSubmit}>
        <input type="text" ref={input} />
      </form>
    </div>
  );
};

export default Room;
