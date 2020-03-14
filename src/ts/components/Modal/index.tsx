import * as React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import css from '~/scss/components/Modal/index.scss';
import mutationAddRoom from '~/graphql/mutations/addRoom.graphql';

type Props = {
  closeModal: () => void;
};

const Modal: React.FC<Props> = React.memo(({ closeModal }) => {
  const [addRoom] = useMutation(gql`
    ${mutationAddRoom}
  `);

  const handleClick = async () => {
    await addRoom({
      variables: {
        id: 1,
        name: 'test',
        count: 0,
        createdAt: '2020-10-10 10:10:10'
      }
    });
  };

  return (
    <div className={css['modal']} onClick={closeModal}>
      <div className={css['modal__inner']}>
        <button onClick={handleClick}>ルーム追加テスト</button>
      </div>
    </div>
  );
});

export default Modal;
