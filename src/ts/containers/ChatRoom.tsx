import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import io from 'socket.io-client';
import { setRoomId, addMessage } from '~/ts/modules/ChatRoom';
import { StoreState } from '~/ts/store';

// 開発でExpressで動かしてるサーバだった場合
let socket = io();

type Props = {
  chatRoom: StoreState['chatRoom'];
  // setRoomId: (value: number) => void;
  addMessage: (value: string) => void;
};

const ChatRoom: React.FC<Props> = ({ chatRoom, addMessage }) => {
  const input = React.useRef<HTMLInputElement>(null);
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (input.current) {
      const value = input.current.value;

      if (value !== '') {
        if (socket) {
          socket.emit('message', value);
          input.current.value = '';
        }
      }
    }
  };
  const messageItems = chatRoom.messages.map((message, index) => {
    return <li key={`message_${index}`}>{message}</li>;
  });

  React.useEffect(() => {
    if (socket) {
      socket.on('message', (message: string) => {
        addMessage(message);
      });
    }
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" ref={input} placeholder="メッセージ" />
      </form>
      <ul>{messageItems}</ul>
    </>
  );
};

const mapStateToProps = (state: StoreState) => {
  return {
    chatRoom: state.chatRoom
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setRoomId: (value: number) => dispatch(setRoomId(value)),
    addMessage: (value: string) => dispatch(addMessage(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
