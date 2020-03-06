import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Layout from '~/ts/layouts/default';
import ChatRoom from '~/ts/components/ChatRoom';

type Props = {} & RouteComponentProps<{ id: string }>;

const Room: React.FC<Props> = ({ match }) => {
  const content = (
    <div>
      <h1>Room {match.params.id}</h1>
      <ChatRoom roomId={match.params.id} />
    </div>
  );

  return <Layout content={content} />;
};

export default Room;
