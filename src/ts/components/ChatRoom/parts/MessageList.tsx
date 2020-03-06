import * as React from 'react';
import { Message } from '~/ts/modules/ChatRoom';

type Props = {
  messages: Message[];
};

const MessageList: React.FC<Props> = React.memo(({ messages }) => {
  const items = messages.map((message, index) => {
    return <li key={`message_${index}`}>{message.message}</li>;
  });

  return <ul>{items}</ul>;
});

export default MessageList;
