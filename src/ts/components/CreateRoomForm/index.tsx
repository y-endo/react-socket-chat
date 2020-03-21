import * as React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import mutationAddRoom from '~/graphql/mutations/addRoom.graphql';
import { AddRoomMutation, AddRoomMutationVariables } from '~/graphql/schema';

type Props = {
  addRoomComplete: (roomId: string) => void;
};

const CreateReactForm: React.FC<Props> = React.memo(({ addRoomComplete }) => {
  const input = React.useRef<HTMLInputElement>(null);
  const [addRoom] = useMutation<AddRoomMutation, AddRoomMutationVariables>(gql`
    ${mutationAddRoom}
  `);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const { data } = await addRoom({
      variables: {
        name: input.current!.value
      }
    });

    if (data && data.addRoom) {
      addRoomComplete(data.addRoom.id);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="部屋名" ref={input} required maxLength={20} />
      <button>作成</button>
    </form>
  );
});

export default CreateReactForm;
