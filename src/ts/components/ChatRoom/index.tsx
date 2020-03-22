import * as React from 'react';
import gql from 'graphql-tag';
import { useSelector } from 'react-redux';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import queryRoomGQL from '~/graphql/queries/room.graphql';
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
  const [queryRoom, { loading, error, data, refetch }] = useLazyQuery(
    gql`
      ${queryRoomGQL}
    `,
    { variables: { id: roomId } }
  );

  const [mutationAddMessage] = useMutation<AddMessageMutation, AddMessageMutationVariables>(gql`
    ${mutationAddMessageGQL}
  `);

  const addMessage = React.useCallback(
    async (message: string) => {
      const isAdded = await mutationAddMessage({
        variables: {
          roomId,
          name: userName,
          text: message
        }
      });
      if (isAdded && socket) {
        socket.emit('addMessage');
      }
    },
    [socket]
  );

  React.useEffect(() => {
    queryRoom();

    if (socket) {
      socket.open();
      socket.emit('join', roomId);
    }

    return () => {
      if (socket) {
        socket.close();
        socket.emit('leave', roomId);
        socket.off('addMessage');
      }
    };
  }, []);

  React.useEffect(() => {
    if (socket) {
      socket.off('addMessage');
      socket.on('addMessage', refetch);
    }
  });

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
        <Input addMessage={addMessage} />
      </>
    );
  }

  return <></>;
};

export default ChatRoom;
