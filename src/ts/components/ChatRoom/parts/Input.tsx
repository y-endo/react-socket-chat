import * as React from 'react';
import { StoreState } from '~/ts/store';

type Props = {
  chatRoom: StoreState['chatRoom'];
};

const Input: React.FC<Props> = ({ chatRoom }) => {
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

  return (
    <form onSubmit={onSubmit}>
      <input type="text" ref={input} placeholder="メッセージ" />
    </form>
  );
};

export default Input;
