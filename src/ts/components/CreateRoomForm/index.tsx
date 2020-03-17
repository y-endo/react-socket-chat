import * as React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import uuid from 'node-uuid';
import mutationAddRoom from '~/graphql/mutations/addRoom.graphql';

const CreateReactForm: React.FC = () => {
  const input = React.useRef<HTMLInputElement>(null);
  const [addRoom] = useMutation(gql`
    ${mutationAddRoom}
  `);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    await addRoom({
      variables: {
        id: uuid.v4(),
        name: input.current!.value,
        count: 0,
        createdAt: new Date()
      }
    });

    alert('チャットルームを作成しました。');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="部屋名" ref={input} required maxLength={20} />
      <button>作成</button>
    </form>
  );
};

export default CreateReactForm;
