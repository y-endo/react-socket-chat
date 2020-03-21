import * as React from 'react';
import gql from 'graphql-tag';
import { useSelector } from 'react-redux';
import { useQuery, useMutation } from '@apollo/react-hooks';
import queryRoom from '~/graphql/queries/room.graphql';
import mutationAddMessageGQL from '~/graphql/mutations/addMessage.graphql';
import { AddMessageMutation, AddMessageMutationVariables } from '~/graphql/schema';
import { StoreState } from '~/ts/store';

import Input from './parts/Input';
import MessageList from './parts/MessageList';

type Props = {
  roomId: string;
};

const ChatRoom: React.FC<Props> = ({ roomId }) => {
  const socket = useSelector<StoreState, StoreState['app']['socket']>(state => state.app.socket);
  // const sessionId = useSelector<StoreState, StoreState['app']['sessionId']>(state => state.app.sessionId);
  const userName = useSelector<StoreState, StoreState['app']['userName']>(state => state.app.userName);
  const { loading, error, data, refetch } = useQuery(
    gql`
      ${queryRoom}
    `,
    {
      variables: { id: roomId }
    }
  );
  const [mutationAddMessage] = useMutation<AddMessageMutation, AddMessageMutationVariables>(gql`
    ${mutationAddMessageGQL}
  `);

  const emitMessage = React.useCallback(
    (message: string, isBroadcast = false) => {
      if (socket) socket.emit(isBroadcast ? 'addMessageBroadcast' : 'addMessage', message);
    },
    [socket]
  );

  const addMessage = async (message: string) => {
    await mutationAddMessage({
      variables: {
        roomId,
        name: userName,
        text: message
      }
    });

    refetch();
  };

  React.useEffect(() => {
    if (socket) {
      socket.on('addMessage', addMessage);
      socket.emit('join', roomId);
    }

    return () => {
      if (socket) {
        socket.emit('leave', roomId);
        socket.off('addMessage');
      }
    };
  }, []);

  if (loading) {
    return <div>読込中...</div>;
  }
  if (error) {
    return <div>エラーが発生しました。</div>;
  }
  if (data) {
    return (
      <>
        <h1>{data.room.name}</h1>
        <MessageList messages={data.room.messages} />
        <Input emitMessage={emitMessage} />
      </>
    );
  }

  return <></>;
};

export default ChatRoom;
